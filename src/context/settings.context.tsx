/* eslint-disable react-refresh/only-export-components */
import {
  createContext, type ReactNode, useCallback, useContext, useMemo, useState,
} from 'react';
import type { CURRENCIES_DATA } from '../constants/form/currencies.constants';

export type CurrencyCode = keyof typeof CURRENCIES_DATA;

interface SettingsContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  isBalanceHidden: boolean;
  setIsBalanceHidden: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'app_currency';
const HIDE_BALANCE_KEY = 'walletBalanceHidden';

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
    return (saved as CurrencyCode) || 'usd';
  });

  const [isBalanceHidden, setIsBalanceHiddenState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(HIDE_BALANCE_KEY);
      return saved ? saved === '1' : false;
    } catch {
      return false;
    }
  });

  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
  }, []);

  const setIsBalanceHidden = useCallback((value: boolean) => {
    setIsBalanceHiddenState(value);
    localStorage.setItem(HIDE_BALANCE_KEY, value ? '1' : '0');
  }, []);

  const value = useMemo(() => ({
    currency,
    setCurrency,
    isBalanceHidden,
    setIsBalanceHidden,
  }), [currency, setCurrency, isBalanceHidden, setIsBalanceHidden]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};