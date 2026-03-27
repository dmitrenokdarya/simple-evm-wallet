import { useState } from 'react';
import { t } from 'i18next';
import clsx from 'clsx';
import ArrowLeftIcon from 'assets/images/icons/arrow-left.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import styles from './styles.module.scss';
import type { WalletRecord } from '../../../../db/types';
import type { WalletTokenItem } from '../../../../types/wallets';
import { getWalletIconById } from '../../../../constants/wallets.constants';
import { formatAmount } from '../../../../utils/amount';
import { truncate, truncateMiddle } from '../../../../utils/formats';
import Header from '../../../../components/Header';

type Props = {
  wallets: WalletRecord[];
  currentWallet: WalletRecord | null;
  selectedToken: WalletTokenItem | null;
  isLoadingTokens: boolean;
  walletsBalances?: Record<string, string>;
  onWalletSelect: (id: string) => void;
};

const WalletTokenSelector = ({
  wallets,
  currentWallet,
  selectedToken,
  isLoadingTokens,
  walletsBalances,
  onWalletSelect,
}: Props) => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const handleWalletSelect = (id: string) => {
    onWalletSelect(id);
    setIsWalletOpen(false);
  };

  const renderWalletList = () =>
    wallets.map((w) => {
      const isActive = currentWallet?.id === w.id;
      return (
        <button
          type="button"
          key={w.id}
          className={clsx(styles.walletItem, { [styles.active]: isActive })}
          onClick={() => handleWalletSelect(w.id)}
        >
          <div className={styles.icon}>{getWalletIconById(w.iconId)}</div>
          <div className={styles.info}>
            <div className={styles.name}>{w.name || 'Wallet'}</div>
            <div className={styles.address}>
              {walletsBalances && walletsBalances[w.id] && selectedToken
                ? `${formatAmount(
                    walletsBalances[w.id],
                    selectedToken.decimals,
                    { fractionDigits: 6 },
                  )} ${selectedToken.symbol}`
                : truncateMiddle(w.address || '')}
            </div>
          </div>
          {isActive && <CheckIcon className={styles.checkIcon} />}
        </button>
      );
    });

  return (
    <div className={styles.walletTokenSelectors}>
      <button
        className={styles.selector}
        type="button"
        onClick={() => setIsWalletOpen(true)}
      >
        <div className={styles.walletIconWrap}>
          {getWalletIconById(currentWallet?.iconId)}
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            {truncate(currentWallet?.name || 'Wallet', 10)}
          </div>
          <div className={styles.balance}>
            {isLoadingTokens || !selectedToken
              ? ''
              : `${formatAmount(selectedToken.amount, selectedToken.decimals, {
                  fractionDigits: 6,
                })} ${selectedToken.symbol}`}
          </div>
        </div>
      </button>

      {isWalletOpen && (
        <div className={styles.overlay}>
          <Header
            leftContent={
              <button onClick={() => setIsWalletOpen(false)}>
                <ArrowLeftIcon />
              </button>
            }
            title={t('myWallets')}
          />
          <div className={styles.overlayContent}>
            <div className={styles.section}>
              <div className={styles.list}>{renderWalletList()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletTokenSelector;
