import { store } from './store';

export async function deleteProfileData(profileId: string): Promise<void> {
  //Получаем индекс кошельков по ключу
  const walletIndexKey = `wallets:index:${profileId}`;
  const walletIds = (await store.getItem<string[]>(walletIndexKey)) ?? [];

  //Удаляем каждый кошелёк
  await Promise.all(
    walletIds.map((id) => {
      const walletKey = `wallet:${id}`;
      return store.removeItem(walletKey);
    }),
  );

  //Удаляем индекс
  await store.removeItem(walletIndexKey);

  //Удаляем vault
  const vaultKey = `vault:${profileId}:wrappedDEK:v1`;
  await store.removeItem(vaultKey);

  //Удаляем остальное (если нужно)
  await store.removeItem(`added_tokens:${profileId}`);
  await store.removeItem(`hidden_tokens:${profileId}`);
  await store.removeItem(`recent_transactions:${profileId}`);
}
