import styles from './styles.module.scss';

type Props = {
  content: string;
  buttonStyleType?: 'round' | 'filledPrimary';
  disabled?: boolean;
};

const Button = ({ content, buttonStyleType = 'filledPrimary', disabled = false }: Props) => {
  return <button disabled={disabled} className={styles[buttonStyleType]}>{content}</button>;
};

export default Button;
