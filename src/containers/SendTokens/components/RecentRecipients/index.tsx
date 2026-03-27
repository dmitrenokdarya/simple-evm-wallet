import { useTranslation } from 'react-i18next';
import { CHAIN, CHAIN_DETAILS } from 'constants/chains.constants';
import ContactAvatar from 'components/ContactAvatar';
import { truncateMiddle } from 'utils/formats';
import { RecentRecipientWithContact } from 'hooks/address-book/useRecentRecipients';
import styles from './styles.module.scss';

interface Props {
  recentRecipients?: RecentRecipientWithContact[];
  chain?: CHAIN;
  onSelect: (address: string) => void;
}

const RecentRecipients = ({
  recentRecipients = [],
  chain,
  onSelect,
}: Props) => {
  const { t } = useTranslation();

  if (recentRecipients.length === 0) return null;

  return (
    <div className={styles.dropdown}>
      {recentRecipients.map((recent) => (
        <button
          key={recent.address}
          type="button"
          className={styles.contactItem}
          onClick={() => onSelect(recent.address)}
        >
          <div className={styles.avatarWrapper}>
            <ContactAvatar
              name={recent.contact?.name || 'Contact'}
              avatar={recent.contact?.avatar}
              size={40}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              {recent.contact?.name || t('contact')}
            </div>
            <div className={styles.address}>
              {truncateMiddle(recent.address)}
              {chain && (
                <div className={styles.blockchainLogo}>
                  {CHAIN_DETAILS[chain]?.icon}
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RecentRecipients;
