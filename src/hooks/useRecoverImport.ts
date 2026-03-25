import { useCallback } from 'react';
import { useNavigate, type Location } from 'react-router-dom';
import { useModal } from '../context/modal.context';
import { useWallets, type WalletRecord } from '../context/wallets.context';
import { MnemonicUtils } from './useCreateLocalWallet';
import {
  encryptTextWithDEK,
  hasVault,
  ensureVaultUnlocked as ensureVaultSessionUnlocked,
} from '../utils/vault';
import { deriveEvmAddressFromMnemonic } from '../utils/evmAddress';
import { ROUTES } from '../constants/routes.constants';
import { saveWallet } from '../db/wallets';
import { deriveEvmAddressFromPrivateKey } from '../utils/evm';
import { t } from 'i18next';
import { MODAL_NAME } from '../constants/modal.constants';

export type RecoverBase = { walletName?: string; walletIcon?: string };
export type RecoverMnemonic = RecoverBase & {
  type: 'mnemonic';
  mnemonic: string;
};
export type RecoverPrivateKey = RecoverBase & {
  type: 'privateKey';
  privateKey: string;
};
export type RecoverContext = RecoverMnemonic | RecoverPrivateKey | null;

const SESSION_KEYS = {
  MNEMONIC: 'recoverMnemonic',
  PRIVATE_KEY: 'recoverPrivateKey',
  WALLET_NAME: 'recoverWalletName',
  WALLET_ICON: 'recoverWalletIcon',
} as const;

export const useRecoverImport = (location: Location) => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { setSelectedWalletId, fetchWallets } = useWallets();

  //Cобирает данные о кошельке из двух источников и возвращает объект с типом (mnemonic или privateKey) и нормализованными данными
  const readRecoverContext = useCallback((): RecoverContext => {
    const stateObj = location.state || {};
    const stateMnemonic: string | undefined = stateObj?.recoverMnemonic;
    const statePrivateKey: string | undefined = stateObj?.recoverPrivateKey;
    const stateWalletName: string | undefined = stateObj?.walletName;
    const stateWalletIcon: string | undefined = stateObj?.walletIcon;

    const storedMnemonic =
      sessionStorage.getItem(SESSION_KEYS.MNEMONIC) || undefined;
    const storedPrivateKey =
      sessionStorage.getItem(SESSION_KEYS.PRIVATE_KEY) || undefined;
    const storedWalletName =
      sessionStorage.getItem(SESSION_KEYS.WALLET_NAME) || undefined;
    const storedWalletIcon =
      sessionStorage.getItem(SESSION_KEYS.WALLET_ICON) || undefined;

    const walletName = stateWalletName || storedWalletName || undefined;
    const walletIcon = stateWalletIcon || storedWalletIcon || undefined;

    const mnemonicRaw = stateMnemonic || storedMnemonic;
    const privateKeyRaw = statePrivateKey || storedPrivateKey;

    if (mnemonicRaw) {
      return {
        type: 'mnemonic',
        mnemonic: MnemonicUtils.normalizeMnemonic(mnemonicRaw),
        walletName,
        walletIcon,
      };
    }
    if (privateKeyRaw) {
      return {
        type: 'privateKey',
        privateKey: privateKeyRaw,
        walletName,
        walletIcon,
      };
    }
    return null;
  }, [location.state]);

  //Сохраняет данные в sessionStorage (чтобы они подождали переход на другую страницу)
  const persistRecoverToSession = useCallback((ctx: RecoverContext) => {
    if (!ctx) return;
    if (ctx.type === 'mnemonic')
      sessionStorage.setItem(SESSION_KEYS.MNEMONIC, ctx.mnemonic);
    if (ctx.type === 'privateKey')
      sessionStorage.setItem(SESSION_KEYS.PRIVATE_KEY, ctx.privateKey);
    if (ctx.walletName)
      sessionStorage.setItem(SESSION_KEYS.WALLET_NAME, ctx.walletName);
    if (ctx.walletIcon)
      sessionStorage.setItem(SESSION_KEYS.WALLET_ICON, ctx.walletIcon);
  }, []);

  //Очищает эти данные после успешного импорта
  const clearRecoverSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEYS.MNEMONIC);
    sessionStorage.removeItem(SESSION_KEYS.PRIVATE_KEY);
    sessionStorage.removeItem(SESSION_KEYS.WALLET_NAME);
    sessionStorage.removeItem(SESSION_KEYS.WALLET_ICON);
  }, []);

  //Импорт из фразы
  const handleMnemonicImport = useCallback(
    async (
      mnemonic: string,
      profileId: string,
      walletName?: string,
      walletIcon?: string,
    ): Promise<WalletRecord> => {
      const id = crypto.randomUUID();
      const evmAddress = await deriveEvmAddressFromMnemonic(mnemonic);
      const encryptedMnemonic = await encryptTextWithDEK(mnemonic, profileId);
      return {
        id,
        profileId,
        type: 'evm',
        encryptedMnemonic,
        address: evmAddress,
        name: walletName,
        iconId: walletIcon,
        seedBackedUp: true,
        createdAt: Date.now(),
      };
    },
    [],
  );

  //Импорт из приватного ключа
  const handlePrivateKeyImport = useCallback(
    async (
      privateKey: string,
      profileId: string,
      walletName?: string,
      walletIcon?: string,
    ): Promise<WalletRecord> => {
      const id = crypto.randomUUID();
      const address = deriveEvmAddressFromPrivateKey(privateKey);
      const encryptedPrivateKey = await encryptTextWithDEK(
        privateKey,
        profileId,
      );

      return {
        id,
        profileId,
        type: 'evm',
        encryptedPrivateKey,
        address,
        name: walletName,
        iconId: walletIcon,
        seedBackedUp: true,
        createdAt: Date.now(),
      };
    },
    [],
  );

  //Проверка разблокировки хранилища
  const ensureVaultUnlocked = useCallback(
    async (profileId: string, nextRoute: string): Promise<boolean> => {
      const exists = await hasVault(profileId);

      // Если vault не существует, первый импорт, пропускаем
      if (!exists) {
        // Сохраняем контекст
        const ctx = readRecoverContext();
        if (ctx) {
          persistRecoverToSession(ctx);
        }
        navigate(ROUTES.CREATE_WALLET, {
          state: { next: nextRoute },
          replace: true,
        });
        return false;
      }

      // Если существует, проверяем разблокировку
      const unlocked = await ensureVaultSessionUnlocked(profileId);
      if (!unlocked) {
        // Сохраняем контекст восстановления в sessionStorage
        const ctx = readRecoverContext();
        if (ctx) {
          persistRecoverToSession(ctx);
        } else {
          // Сохраняем имя и иконку из location.state (если есть)
          const stateObj = (location.state || {}) as {
            walletName?: string;
            walletIcon?: string;
          };
          if (stateObj.walletName) {
            sessionStorage.setItem(
              SESSION_KEYS.WALLET_NAME,
              stateObj.walletName,
            );
          }
          if (stateObj.walletIcon) {
            sessionStorage.setItem(
              SESSION_KEYS.WALLET_ICON,
              stateObj.walletIcon,
            );
          }
        }

        navigate(ROUTES.CREATE_WALLET, {
          state: { next: nextRoute },
          replace: true,
        });
        return false;
      }

      return true;
    },
    [navigate, persistRecoverToSession, readRecoverContext, location.state],
  );

  //Основная функция импорта
  const importAndSave = useCallback(
    async (profileId: string): Promise<WalletRecord | null> => {
      const ctx = readRecoverContext();
      if (!ctx) return null;
      let record: WalletRecord;
      if (ctx.type === 'mnemonic') {
        record = await handleMnemonicImport(
          ctx.mnemonic,
          profileId,
          ctx.walletName,
          ctx.walletIcon,
        );
      } else {
        record = await handlePrivateKeyImport(
          ctx.privateKey,
          profileId,
          ctx.walletName,
          ctx.walletIcon,
        );
      }
      const savedId = await saveWallet(record);
      await fetchWallets();
      setSelectedWalletId(savedId);
      clearRecoverSession();
      return record;
    },
    [
      clearRecoverSession,
      fetchWallets,
      handleMnemonicImport,
      handlePrivateKeyImport,
      readRecoverContext,
      setSelectedWalletId,
    ],
  );

  const showSuccess = useCallback(() => {
    showModal(MODAL_NAME.SUCCESS_MODAL, {
      subtitle: t('yourAreReadyToUseBlackFortWallet'),
    });
  }, [showModal]);

  return {
    readRecoverContext,
    persistRecoverToSession,
    clearRecoverSession,
    ensureVaultUnlocked,
    importAndSave,
    showSuccess,
  };
};
