import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import { useWallets } from '../../../context/wallets.context';
import { useModal } from '../../../context/modal.context';
import { decryptTextWithDEK, ensureVaultUnlocked } from '../../../utils/vault';
import { MODAL_NAME } from '../../../constants/modal.constants';
import { ROUTES } from '../../../constants/routes.constants';
import { encryptPrivateKeyToKeystore } from '../../../utils/keystore';
import { deriveEvmPrivateKeyFromMnemonic } from '../../../utils/evm';

export type RevealSecretType = 'mnemonic' | 'keystore' | 'privateKey';

export const useRevealSecret = (initialTab: RevealSecretType = 'mnemonic') => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wallets, updateWallet } = useWallets();
  const { showModal } = useModal();
  const wallet = wallets.find((w) => w.id === id);

  const [activeTab, setActiveTab] = useState<RevealSecretType>(() => {
    if (initialTab === 'mnemonic' && wallet && !wallet.encryptedMnemonic) {
      return 'privateKey';
    }
    return initialTab;
  });

  const [isCopied, setIsCopied] = useState(false);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isDecrypting = useRef(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keystoreError, setKeystoreError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const decryptSecrets = useCallback(async () => {
    if (!wallet) return;

    if (!isDecrypting.current) {
      isDecrypting.current = true;
      try {
        if (wallet.encryptedMnemonic) {
          const decryptedMnemonic = await decryptTextWithDEK(wallet.encryptedMnemonic, wallet.profileId);
          setMnemonic(decryptedMnemonic);
          if (!wallet.encryptedPrivateKey) {
            setPrivateKey(deriveEvmPrivateKeyFromMnemonic(decryptedMnemonic));
          }
        }

        if (wallet.encryptedPrivateKey) {
          const decryptedPk = await decryptTextWithDEK(wallet.encryptedPrivateKey, wallet.profileId);
          setPrivateKey(decryptedPk);
        }
      } catch (e) {
        setError(t('failedToDecryptSecrets'));
        console.error(e);
      } finally {
        isDecrypting.current = false;
      }
    }
  }, [wallet]);

  useEffect(() => {
    if (!wallet) return;
    (async () => {
      const unlocked = await ensureVaultUnlocked(wallet.profileId);
      if (!unlocked) {
        showModal(MODAL_NAME.UNLOCK_VAULT_MODAL, {
          activeProfileId: wallet.profileId,
          onUnlocked: () => {
            decryptSecrets();
          },
          onCancel: () => {
            navigate(ROUTES.MANAGE_WALLET.replace(':id', id || ''));
          },
        });
        return;
      }
      decryptSecrets();
    })();
  }, [wallet, id, navigate, showModal, decryptSecrets]);

  const markAsBackedUp = useCallback(() => {
    if (wallet && !wallet.seedBackedUp) {
      updateWallet(wallet.id, { seedBackedUp: true });
    }
  }, [wallet, updateWallet]);

  const onCopy = useCallback(async () => {
    const secret = activeTab === 'mnemonic' ? mnemonic : privateKey;
    if (!secret || !wallet) return;
    try {
      await navigator.clipboard.writeText(secret);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      markAsBackedUp();
    } catch { /* noop */ }
  }, [activeTab, mnemonic, privateKey, wallet, markAsBackedUp]);

  const handleDownloadKeystore = async () => {
    if (!privateKey || !wallet) return;
    if (!password || password !== confirmPassword) {
      setKeystoreError(t('passwordsDoNotMatch'));
      return;
    }

    setIsDownloading(true);
    setKeystoreError(null);
    try {
      const lowerAddr = (wallet.address || '').toLowerCase();
      const ks = await encryptPrivateKeyToKeystore(privateKey, password, lowerAddr);
      const content = JSON.stringify(ks, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `keystore-${ks.address}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      markAsBackedUp();
    } catch (e) {
      setKeystoreError(t('failedToExportKeystore'));
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    wallet,
    activeTab,
    setActiveTab,
    isCopied,
    mnemonic,
    privateKey,
    error,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    keystoreError,
    isDownloading,
    onCopy,
    handleDownloadKeystore,
    markAsBackedUp,
    id,
  };
};


