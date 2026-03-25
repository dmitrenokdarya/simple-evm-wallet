import { store } from "./store";
import type { WalletRecord } from "./types";

export async function saveWallet(record: WalletRecord): Promise<string> {
  //Получаем список ID кошельков для этого профиля
  const indexKey = `wallets:index:${record.profileId}`;
  const list = (await store.getItem<string[]>(indexKey)) ?? [];

  //Если кошелёк уже есть в индексе — просто обновляем
  if (list.includes(record.id)) {
    await store.setItem(`wallet:${record.id}`, record);
    return record.id;
  }

  //Проверяем, нет ли уже кошелька с таким же адресом
  const existingIds = [...list];
  const fetched = await Promise.all(
    existingIds.map((id) => store.getItem<WalletRecord>(`wallet:${id}`)),
  );
  const existingWallets = fetched.filter(
    (w: WalletRecord | null): w is WalletRecord => Boolean(w),
  );
  const duplicate = existingWallets.find(
    (w: WalletRecord | null) =>
      w?.profileId === record.profileId &&
      w.address?.toLowerCase() === record.address?.toLowerCase(),
  );

  //Если нашли дубликат — обновляем его (сохраняем старый ID и дату)
  if (duplicate) {
    const merged: WalletRecord = {
      ...duplicate,
      ...record,
      id: duplicate.id,
      createdAt: duplicate.createdAt,
      seedBackedUp: Boolean(duplicate.seedBackedUp || record.seedBackedUp),
      // prefer newly provided metadata/secrets when present, otherwise keep old
      encryptedMnemonic:
        record.encryptedMnemonic ?? duplicate.encryptedMnemonic,
      encryptedPrivateKey:
        record.encryptedPrivateKey ?? duplicate.encryptedPrivateKey,
      name: record.name ?? duplicate.name,
      iconId: record.iconId ?? duplicate.iconId,
    };
    await store.setItem(`wallet:${duplicate.id}`, merged);
    return duplicate.id;
  }

  //Новый кошелёк — сохраняем и добавляем в индекс
  await store.setItem(`wallet:${record.id}`, record);
  list.push(record.id);
  await store.setItem(indexKey, list);

  return record.id;
}

export async function getWallet(id: string): Promise<WalletRecord | undefined> {
  const rec = await store.getItem<WalletRecord>(`wallet:${id}`);
  return rec ?? undefined;
}

export async function listWalletsByProfile(profileId: string): Promise<WalletRecord[]> {
  const indexKey = `wallets:index:${profileId}`;
  const ids = (await store.getItem<string[]>(indexKey)) ?? [];
  if (ids.length === 0) return [];

  const results = await Promise.all(ids.map((id) => store.getItem<WalletRecord>(`wallet:${id}`)));
  return results.filter((r): r is WalletRecord => Boolean(r));
}

// export async function moveWallets(fromProfileId: string, toProfileId: string): Promise<void> {
//   const wallets = await listWalletsByProfile(fromProfileId);
//   if (wallets.length === 0) return;

//   const toIndexKey = KEY.walletIndexByProfile(toProfileId);
//   const toList = (await store.getItem<string[]>(toIndexKey)) ?? [];

//   await Promise.all(wallets.map(async (wallet) => {
//     const updatedWallet = { ...wallet, profileId: toProfileId };
//     await store.setItem(KEY.wallet(updatedWallet.id), updatedWallet);
//     if (!toList.includes(updatedWallet.id)) {
//       toList.push(updatedWallet.id);
//     }
//   }));

//   await store.setItem(toIndexKey, toList);

//   // Remove from old index
//   const fromIndexKey = KEY.walletIndexByProfile(fromProfileId);
//   await store.removeItem(fromIndexKey);
// }

export async function markSeedBackedUp(id: string): Promise<void> {
  const key = `wallet:${id}`;
  const rec = await store.getItem<WalletRecord>(key);
  if (rec) {
    rec.seedBackedUp = true;
    await store.setItem(key, rec);
  }
}
