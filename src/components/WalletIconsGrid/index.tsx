import clsx from 'clsx';
import styles from './styles.module.scss';
import { WALLET_ICONS } from '../../constants/wallets.constants';

interface IconsGridProps {
  selectedIcon: string;
  onSelect: (id: string) => void;
}

export const WalletsIconGrid = ({ selectedIcon, onSelect }: IconsGridProps) => (
  <div className={styles.iconsGrid}>
    {WALLET_ICONS.map((icon) => (
      <button
        key={icon.id}
        type="button"
        className={clsx(
          styles.iconBtn,
          { [styles.iconBtnSelected]: selectedIcon === icon.id },
        )}
        onClick={() => onSelect(icon.id)}
      >
        {icon.img}
      </button>
    ))}
  </div>
);
