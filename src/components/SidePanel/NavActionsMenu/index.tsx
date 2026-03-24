import { type ReactNode } from 'react';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import ChevronRightIcon from 'assets/images/icons/chevron-right.svg';
import styles from './styles.module.scss';

type Props = {
  actions: {
    text: string;
    subcontent?: ReactNode;
    link?: string;
    icon: ReactNode;
    onClick?: () => void;
  }[];
  onClose?: () => void;
};

export const NavActionsMenu = ({ actions, onClose }: Props) => (
  <div className={styles.actions}>
    {actions.map(({
      icon, text, link, subcontent, onClick,
    }) => {
      const handleClick = () => {
        onClick?.();
        onClose?.();
      };

      const content = (
        <button
          className={styles.action}
          type="button"
          onClick={handleClick}
        >
          <div className={styles.right}>
            {icon}
            {t(text)}
          </div>
          <div className={styles.left}>
            {subcontent}
            <ChevronRightIcon className={styles.actionIcon} />
          </div>
        </button>
      );

      return link ? (
        <Link key={text} to={link}>
          {content}
        </Link>
      ) : (
        <div key={text}>
          {content}
        </div>
      );
    })}
  </div>
);
