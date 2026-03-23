import { HISTORY_API_BASE_URL } from '../../config/env';
import { Blackfort, type GetTokenPricesV2ResponseDTO } from './blackfort-history-backend-api';
import axios from 'axios';

export const historyApi = new Blackfort({
  baseURL: HISTORY_API_BASE_URL,
  proxy: false,
  secure: false,
});

export type PricesV2Query = {
  bsc?: string[];
  btc?: string[];
  bxn?: string[];
  dot?: string[];
  eth?: string[];
  ltc?: string[];
  polygon?: string[];
  sol?: string[];
  ton?: string[];
  tron?: string[];
  useNewFormat?: boolean;
  vsCurrencies: string[];
  xrp?: string[];
};

// Wrapper that builds query with repeated keys (no [] brackets) and calls axios.get directly
export async function getPricesV2(
  query: PricesV2Query,
): Promise<GetTokenPricesV2ResponseDTO> {
  const params = new URLSearchParams();
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v == null) return;
        params.append(key, String(v));
      });
    } else {
      params.append(key, String(value));
    }
  });

  const url = `${HISTORY_API_BASE_URL}/api/v2/prices?${params.toString()}`;
  const resp = await axios.get<GetTokenPricesV2ResponseDTO>(url);
  return resp.data;
}

export default historyApi;
