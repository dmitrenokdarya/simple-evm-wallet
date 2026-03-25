import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.scss';
import { useWalletTokens } from '../../../hooks/useWalletTokens';
import Loader from '../../../components/Loader';
import { ROUTES } from '../../../constants/routes.constants';
import TokenCurrencyItem from '../../../components/TokenCurrencyItem';


export const Currency = () => {
  const { totalFiat, amount, price, change24h, isLoading } = useWalletTokens();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader colorful />
      </div>
    );
  }

  const ETH = 'eth' as const
  
  //Формируем объект токена для отображения
  const ethToken = {
    chain: ETH,
    contractAddress: 'native',
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    amount: amount,
    fiatAmount: totalFiat,
    price: price,
    price24hChange: change24h,
  };

  return (
    <div className={styles.currencies}>
      <TokenCurrencyItem
        key="eth"
        item={ethToken}
        onClick={() => navigate(ROUTES.TOKEN_DETAILS, {
          state: { token: ethToken }
        })}
      />
    </div>
  );
};