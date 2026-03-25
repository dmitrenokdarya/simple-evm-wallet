/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddTrackedTokenDTO {
  /** @example "0x..." */
  address: string;
  /** @example "eth" */
  chain: string;
}

export interface AddressDTO {
  address: string;
  /** @example 1 */
  value?: number;
}

export interface AddressEventDTO {
  address?: string;
  amount: string;
  asset?: string;
  /** @example 1 */
  blockNumber?: number;
  chain?: string;
  currency?: string;
  from: string;
  subscriptionType: string;
  to: string;
  txId: string;
  type?: string;
}

export interface AddressUnspentOutput {
  address: string;
  /** @example true */
  isCoinbase: boolean;
  mempoolTime?: string;
  /** @example 1 */
  mintBlockHeight: number;
  /** @example 1 */
  mintIndex: number;
  mintTransactionHash: string;
  script: string;
  /** @example 1 */
  sequenceNumber: number;
  /** @example 1 */
  spentBlockHeight: number;
  /** @example 1 */
  spentIndex: number;
  spentTansactionHash?: string;
  /** @example 1 */
  value: number;
}

export interface BalanceByChainDTO {
  balance: string;
  /** @example "eth" */
  chain: string;
}

export type BitcoinWebhookPayloadDTO = object;

export interface BtcEstimateFeeParamsDTO {
  /** @example 1 */
  inputsAmount: number;
  /** @example 1 */
  outputsAmount: number;
}

export interface BtcFeeDTO {
  /** @example 1 */
  amount: number;
}

export interface BxnEstimateFeeParamsDTO {
  contractAddress?: string;
  data?: string;
  from?: string;
  to: string;
  value?: string;
}

export interface BxnFeeDTO {
  /** @example 1 */
  gasLimit: number;
  /** @example 1 */
  gasPrice: number;
  totalPrice?: number;
}

export interface ChainWalletAddressDto {
  chain: string;
  walletAddress: string;
}

export interface ChainWalletTokensDto {
  chain:
    | "bxn"
    | "eth"
    | "bsc"
    | "polygon"
    | "btc"
    | "sol"
    | "dot"
    | "xrp"
    | "ton"
    | "ltc"
    | "tron";
  tokens: FungibleTokenBalanceDTO[];
}

export interface CheckUrlRequestBodyDTO {
  deviceId: string;
  url: string;
}

export interface CheckUrlResponseDTO {
  status: "neutral" | "dangerous" | "validated";
}

export interface CheckWalletRequestBodyDTO {
  address: string;
  /** @example "eth" */
  chain: string;
  deviceId: string;
}

export interface CheckWalletResponseDTO {
  /**
   * @format date-time
   * @example "2022-01-11T17:28:44.079Z"
   */
  addressCreationDate?: string;
  metrics: ToxicScoreTrait[];
  /** @example 1 */
  toxicScore: number;
}

export interface CollectionDTO {
  chain: string;
  collectionId: string;
  collectionImageUrl?: string;
  collectionName?: string;
  /** @example true */
  isBxn: boolean;
  /** @example 1 */
  ownedNftCount: number;
  type: string;
}

export interface ContractDTO {
  address: string;
}

export interface CreatePaymentRequestBodyDTO {
  amount: string;
  chain: string;
  initiatorCoinAddress: string;
  initiatorReferralId: string;
  initiatorWalletAddress: string;
  recipientReferralId: string;
  /** @example true */
  sendPushNotification: boolean;
  tokenContractAddress: string;
}

export interface DeviceNotificationSettingsDTO {
  /** @example true */
  isMarketMovementsNotificationsEnabled?: boolean;
  /** @example true */
  isPaymentRequestNotificationsEnabled?: boolean;
  /** @example true */
  isPushNotificationsEnabled: boolean;
}

export interface EthEstimateFeeParamsDTO {
  amount?: string;
  contractAddress?: string;
  data?: string;
  from?: string;
  to: string;
  tokenId?: string;
  value?: string;
}

export interface EthFeeDTO {
  /** @example 1 */
  gasLimit: number;
  /** @example 1 */
  gasPrice: number;
}

export interface FailedTxEventDTO {
  address: string;
  amount: string;
  /** @example 1 */
  blockNumber?: number;
  chain: string;
  counterAddress: string;
  currency: string;
  /** @example true */
  mempool: boolean;
  subscriptionType: string;
  txId: string;
}

export interface FungibleTokenBalanceDTO {
  amount: string;
  token: FungibleTokenInfoDTO;
}

export interface FungibleTokenDTO {
  contract?: ContractDTO;
  /** @example 1 */
  decimals: number;
  name: string;
  symbol: string;
}

export interface FungibleTokenInfoDTO {
  contractAddress: string;
  /** @example 1 */
  decimals: number;
  name: string;
  symbol: string;
  type: string;
}

export interface FungibleTokenListItemDTO {
  amount: string;
  chain?:
    | "bxn"
    | "eth"
    | "bsc"
    | "polygon"
    | "btc"
    | "sol"
    | "dot"
    | "xrp"
    | "ton"
    | "ltc"
    | "tron";
  token: FungibleTokenDTO;
}

export interface GetAddressOwnedTokensBalanceBodyDto {
  chains: ChainWalletAddressDto[];
  /** @example "usd" */
  currency: string;
}

export interface GetAddressOwnedTokensBalanceResponseDto {
  balancesByChains: BalanceByChainDTO[];
  /** @example "usd" */
  currency: string;
  totalBalance: string;
}

export interface GetAddressOwnedTokensBodyDto {
  chains: ChainWalletAddressDto[];
}

export interface GetAddressOwnedTokensResponseDto {
  chains: ChainWalletTokensDto[];
}

export interface GetAddressUnspentOutputsResponseDTO {
  items: AddressUnspentOutput[];
}

export interface GetChainInfoResponseDTO {
  blockHash: string;
  blockNumber: number;
  genesisHash: string;
  nonce: number;
  specVersion: number;
  transactionVersion: number;
}

export interface GetCoinHistoricalChartDataResponseDTO {
  marketCaps: (number | null)[][];
  prices: (number | null)[][];
}

export interface GetFungibleListBodyDTO {
  data: GetFungibleTokensInfoDTO[];
}

export interface GetFungibleListResponseDTO {
  data: FungibleTokenListItemDTO[];
}

export interface GetFungibleListWithBalancesResponseDTO {
  data: FungibleTokenListItemDTO[];
  /** Array of chain characters in which a mistake was made on the third party`s side */
  errors: string[];
}

export interface GetFungibleTokensInfoDTO {
  address: string;
  chain: string;
  /** Array of erc-20 tokens addresses. For native currency use 0x0000000000000000000000000000000000000000 */
  contractAddresses: string[];
}

export interface GetNonFungibleCollectionListBodyDto {
  address: string;
  chain: string;
}

export interface GetNonFungibleCollectionListBodyV2Dto {
  data: GetNonFungibleCollectionListBodyDto[];
}

export interface GetNonFungibleCollectionListResponseDto {
  /** @example 1 */
  count?: number;
  items: CollectionDTO[];
  /** @example 1 */
  limit: number;
  nextPageCursor?: string;
}

export interface GetNonFungibleTokensBodyDto {
  address: string;
  chain: string;
  collectionAddress?: string;
  collectionId?: string;
}

export interface GetNonFungibleTokensResponseDto {
  /** @example 1 */
  count?: number;
  items: TokenDTO[];
  /** @example 1 */
  limit: number;
  nextPageCursor?: string;
}

export interface GetNonceResponseDTO {
  /** @example 1 */
  nonce: number;
}

export interface GetNowBlockResponseDTO {
  /** @example 1 */
  number: number;
  parentHash: string;
  /** @example 1 */
  timestamp: number;
  txTrieRoot: string;
  /** @example 1 */
  version: number;
  witness_address: string;
}

export interface GetPaymentRequestsResponseDTO {
  archived: PaymentRequestItemDTO[];
  /** @example 1 */
  count: number;
  pending: PaymentRequestItemDTO[];
}

export interface GetPendingRequestsResponseDTO {
  /** @example 1 */
  pendingCount: number;
}

export interface GetPresignedLinkResponseDTO {
  /** @example 1 */
  fileId: number;
  url: string;
}

export interface GetRecentBlockhashResponseDTO {
  recentBlockhash: string;
}

export interface GetSequenceInfoResponseDTO {
  lastLedgerSequence: number;
  sequence: number;
}

export interface GetTokenInfoResponseDTO {
  /** @example 1 */
  decimals: number;
  name: string;
  symbol: string;
  type:
    | "ERC20"
    | "ERC721"
    | "ERC1155"
    | "BEP20"
    | "TRC10"
    | "TRC20"
    | "BXP20"
    | "BXP721"
    | "BXP1155"
    | "PRC20";
}

export interface GetTokenPricesResponseDTO {
  items: NewTokenWithPrice[];
}

export interface GetTokenPricesV2ResponseDTO {
  /** Array of chain characters in which a mistake was made on the third party`s side */
  errors: string[];
  items: NewTokenWithPrice[];
}

export interface GetTransactionFeesResponseDTO {
  average: object;
  fast: object;
  low: object;
}

export interface GetTransactionStatusResponseDTO {
  status: "PENDING" | "COMPLETED" | "REJECTED" | "UNKNOWN";
}

export interface GetTransfersResponseDTO {
  /** @example 1 */
  count?: number;
  items: TransferDTO[];
  /** @example 1 */
  limit: number;
  nextPageCursor?: string;
  /** @example 1 */
  skip?: number;
}

export interface NewTokenWithPrice {
  address: string;
  chain:
    | "bxn"
    | "eth"
    | "bsc"
    | "polygon"
    | "btc"
    | "sol"
    | "dot"
    | "xrp"
    | "ton"
    | "ltc"
    | "tron";
  prices: PriceWithCurrency[];
}

export interface PaymentRequestItemDTO {
  amount: string;
  chain: string;
  /**
   * @format date-time
   * @example "2022-01-11T17:28:44.079Z"
   */
  date: string;
  id: string;
  initiatorCoinAddress: string;
  initiatorReferralId: string;
  initiatorWalletAddress: string;
  /** @example true */
  isExpired: boolean;
  recipientReferralId: string;
  /** @example true */
  sendPushNotification: boolean;
  status: "pending" | "paid" | "rejected";
  tokenContractAddress?: string | null;
  tokenName: string;
}

export interface PriceWithCurrency {
  /** @example 1 */
  price24hChange?: number;
  currency:
    | "usd"
    | "aed"
    | "ars"
    | "aud"
    | "bdt"
    | "bhd"
    | "bmd"
    | "brl"
    | "cad"
    | "chf"
    | "clp"
    | "cny"
    | "czk"
    | "dkk"
    | "eur"
    | "gbp"
    | "gel"
    | "hkd"
    | "huf"
    | "idr"
    | "ils"
    | "inr"
    | "jpy"
    | "krw"
    | "kwd"
    | "lkr"
    | "mmk"
    | "mxn"
    | "myr"
    | "ngn"
    | "nok"
    | "nzd"
    | "php"
    | "pkr"
    | "pln"
    | "rub"
    | "sar"
    | "sek"
    | "sgd"
    | "thb"
    | "try"
    | "twd"
    | "uah"
    | "vef"
    | "vnd"
    | "zar"
    | "xdr";
  /** @example 1 */
  price?: number;
}

export type QuickNodeLogDTO = object;

export type QuickNodeReceiptDTO = object;

export type QuickNodeTransactionDTO = object;

export interface QuickNodeWebhookPayloadDTO {
  /** Array of matching logs */
  matchingLogs: QuickNodeLogDTO[] | null;
  /** Array of matching receipts */
  matchingReceipts: QuickNodeReceiptDTO[] | null;
  /** Array of matching transactions */
  matchingTransactions: QuickNodeTransactionDTO[] | null;
}

export interface ResetDeviceDataDTO {
  deviceId: string;
  fcmToken: string;
  /** @example true */
  isPushNotificationsEnabled?: boolean;
  wallets: WalletDTO[];
}

export interface SendFeedbackBodyDTO {
  /**
   * Email
   * @example "koko@ko.ko"
   */
  email: string;
  /** @example 1 */
  fileId: number;
}

export interface SendRawTransactionBodyDTO {
  chain:
    | "bxn"
    | "eth"
    | "bsc"
    | "polygon"
    | "btc"
    | "sol"
    | "dot"
    | "xrp"
    | "ton"
    | "ltc"
    | "tron";
  rawTx: string;
}

export interface SendRawTransactionResponseDTO {
  hash: string;
}

export interface SendTransactionBodyDTO {
  chain:
    | "bxn"
    | "eth"
    | "bsc"
    | "polygon"
    | "btc"
    | "sol"
    | "dot"
    | "xrp"
    | "ton"
    | "ltc"
    | "tron";
  tx: string;
}

export interface SendTransactionResponseDTO {
  hash: string;
}

export interface SnapResponseDTOItem {
  /** @example "0x6f55570da4d58b21299f2f9d948deb896bc7831c" */
  fakeAddress: string;
  /** @example "0x6f55570de07ad6eb832802760f1b358869c7831c" */
  similarAddress: string;
  /** @example "2023-08-09T17:04:35.000Z" */
  transactionDate: string;
  /** @example "0xce5d777b9cb3d13e8d2e67636f4e5deb13514bc606f790ed3c1411798dcc31e" */
  transactionHash: string;
  /** @example "poisoning_attack" */
  type: string;
}

export interface StatusDTO {
  status: "OK" | "No Content";
}

export interface SupportedCurrencyDTO {
  fullName: string;
  id: string;
  sign: string;
  /** @example true */
  suggested: boolean;
  symbol: string;
}

export interface TokenDTO {
  amount: string;
  chain: string;
  collectionId: string;
  collectionName?: string;
  contractAddress: string;
  description: string;
  externalId: string;
  imageUrl?: string;
  /** @example true */
  isBxn: boolean;
  name?: string;
  price?: string;
  tokenId: string;
  type: string;
}

export interface ToxicScoreTrait {
  /**
   * @format date-time
   * @example "2022-01-11T17:28:44.079Z"
   */
  latestTxUtc?: string;
  name:
    | "known_scammer"
    | "initiator_scam_transactions"
    | "sanction_address_communication"
    | "suspicious_dex_pair_deployer"
    | "suspicious_deployer"
    | "attack_money_target"
    | "zero_address_risk"
    | "sanction_address"
    | "fake_phishing_transfer"
    | "non_kyc_transfers"
    | "mixer_transfers"
    | "fake_phishing_contract_communication";
  /** @example 1 */
  risk: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  /** @example 1 */
  txsCount?: number;
}

export interface TrackedTokenDTO {
  /** @example "0x..." */
  address: string;
  /** @example "eth" */
  chain: string;
  /** @example 1 */
  id: number;
  prices: PriceWithCurrency[];
}

export interface TransferDTO {
  /** @example 1 */
  fee: number;
  from: AddressDTO[];
  /** @example 1 */
  gasLimit: number;
  /** @example 1 */
  gasPrice: number;
  hash: string;
  input: string;
  /** @example 1 */
  lt?: number;
  /** @example 1 */
  nonce: number;
  scamType: "scam_airdrop" | "poisoning" | "fake_token" | null;
  status: string;
  /** @example 1 */
  timestamp: number;
  to: AddressDTO[];
  value: string;
}

export interface ValidateTxBodyDTO {
  /** @example "eth" */
  chain: string;
  from: string;
  to: string;
}

export interface ValidateTxResponseDTO {
  /** @example 1 */
  count: number;
  items: SnapResponseDTOItem[];
}

export interface WalletDTO {
  address: string;
  /** @example "eth" */
  chain: string;
}

export interface WalletsDTO {
  wallets: WalletDTO[];
}

export interface XrpEventsDTO {
  events: AddressEventDTO[];
  failedEvents: FailedTxEventDTO[];
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title blackfort-history-backend
 * @version 0.1.0
 * @contact
 */
export class Blackfort<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Address
     * @name AddressControllerGetAddressNonceV1
     * @request GET:/api/v1/address/nonce
     */
    addressControllerGetAddressNonceV1: (
      query: {
        address: string;
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
      },
      params: RequestParams = {},
    ) =>
      this.request<GetNonceResponseDTO, any>({
        path: `/api/v1/address/nonce`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Address
     * @name AddressControllerGetAddressUnspentOutputsV1
     * @request GET:/api/v1/address/unspent-outputs
     */
    addressControllerGetAddressUnspentOutputsV1: (
      query: {
        address: string;
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAddressUnspentOutputsResponseDTO, any>({
        path: `/api/v1/address/unspent-outputs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Address
     * @name AddressControllerGetChainInfoV1
     * @request GET:/api/v1/address/chain-info
     */
    addressControllerGetChainInfoV1: (
      query: {
        address: string;
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
      },
      params: RequestParams = {},
    ) =>
      this.request<GetChainInfoResponseDTO, any>({
        path: `/api/v1/address/chain-info`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Address
     * @name AddressControllerGetNowBlockV1
     * @request GET:/api/v1/address/getnowblock
     */
    addressControllerGetNowBlockV1: (
      query: {
        /** @example "eth" */
        chain: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetNowBlockResponseDTO, any>({
        path: `/api/v1/address/getnowblock`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Address
     * @name AddressControllerGetRecentBlockhashV1
     * @request GET:/api/v1/address/recent-blockhash
     */
    addressControllerGetRecentBlockhashV1: (
      query: {
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
      },
      params: RequestParams = {},
    ) =>
      this.request<GetRecentBlockhashResponseDTO, any>({
        path: `/api/v1/address/recent-blockhash`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Address
     * @name AddressControllerGetSequenceInfoV1
     * @request GET:/api/v1/address/sequence-info
     */
    addressControllerGetSequenceInfoV1: (
      query: {
        address: string;
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
      },
      params: RequestParams = {},
    ) =>
      this.request<GetSequenceInfoResponseDTO, any>({
        path: `/api/v1/address/sequence-info`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks.Quicknode.Bitcoin
     * @name BitcoinWebhookControllerAddressEvent
     * @request POST:/api/webhooks/quicknode/btc/address
     */
    bitcoinWebhookControllerAddressEvent: (
      data: BitcoinWebhookPayloadDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/webhooks/quicknode/btc/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Charts
     * @name ChartsControllerGetCoinHistoricalChartDataV1
     * @request GET:/api/v1/charts
     */
    chartsControllerGetCoinHistoricalChartDataV1: (
      query: {
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
        contractAddress: string;
        period: "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";
        vsCurrency: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetCoinHistoricalChartDataResponseDTO, any>({
        path: `/api/v1/charts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Devices
     * @name DeviceControllerAddDeviceWallet
     * @summary Add new wallets to device
     * @request POST:/api/devices/{deviceId}/wallets
     */
    deviceControllerAddDeviceWallet: (
      deviceId: string,
      data: WalletsDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/devices/${deviceId}/wallets`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Devices
     * @name DeviceControllerCheckDeviceExistence
     * @summary Check device existence
     * @request GET:/api/devices/{deviceId}
     */
    deviceControllerCheckDeviceExistence: (
      deviceId: string,
      params: RequestParams = {},
    ) =>
      this.request<boolean, any>({
        path: `/api/devices/${deviceId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Devices
     * @name DeviceControllerDeleteDevice
     * @summary Delete device and wallets and subscriptions
     * @request DELETE:/api/devices/{deviceId}
     */
    deviceControllerDeleteDevice: (
      deviceId: string,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/devices/${deviceId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Devices
     * @name DeviceControllerDeleteDeviceWallets
     * @summary Delete wallets and subscriptions from device
     * @request DELETE:/api/devices/{deviceId}/wallets/some
     */
    deviceControllerDeleteDeviceWallets: (
      deviceId: string,
      data: WalletsDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/devices/${deviceId}/wallets/some`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Devices
     * @name DeviceControllerResetDevice
     * @summary Reset device and wallets
     * @request POST:/api/devices
     */
    deviceControllerResetDevice: (
      data: ResetDeviceDataDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/devices`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Devices
     * @name DeviceControllerSetDeviceNotificationSettings
     * @summary Reset notification setting with creation/deleting subscriptions
     * @request PATCH:/api/devices/{deviceId}
     */
    deviceControllerSetDeviceNotificationSettings: (
      deviceId: string,
      data: DeviceNotificationSettingsDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/devices/${deviceId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedback
     * @name FeedbackControllerGetPresignedLink
     * @request GET:/api/feedback/presigned-link
     */
    feedbackControllerGetPresignedLink: (
      query: {
        contentType: string;
        filename: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPresignedLinkResponseDTO, any>({
        path: `/api/feedback/presigned-link`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedback
     * @name FeedbackControllerSendFeedback
     * @request POST:/api/feedback/send
     */
    feedbackControllerSendFeedback: (
      data: SendFeedbackBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/feedback/send`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags health-check
     * @name HealthCheckControllerCheckHealth
     * @request GET:/api/health-check
     */
    healthCheckControllerCheckHealth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/health-check`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Market Movements (Token Tracking)
     * @name MarketMovementsControllerAddTrackedToken
     * @summary Add a token to the price tracking list
     * @request POST:/api/devices/{deviceId}/market-movements/tokens
     */
    marketMovementsControllerAddTrackedToken: (
      deviceId: string,
      data: AddTrackedTokenDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, void>({
        path: `/api/devices/${deviceId}/market-movements/tokens`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Market Movements (Token Tracking)
     * @name MarketMovementsControllerGetTrackedTokens
     * @summary Get list of tracked tokens with prices
     * @request GET:/api/devices/{deviceId}/market-movements/tokens
     */
    marketMovementsControllerGetTrackedTokens: (
      deviceId: string,
      query: {
        vsCurrencies: any[];
      },
      params: RequestParams = {},
    ) =>
      this.request<TrackedTokenDTO[], any>({
        path: `/api/devices/${deviceId}/market-movements/tokens`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Market Movements (Token Tracking)
     * @name MarketMovementsControllerRemoveTrackedToken
     * @summary Remove a token from the tracking list
     * @request DELETE:/api/devices/{deviceId}/market-movements/tokens/{tokenId}
     */
    marketMovementsControllerRemoveTrackedToken: (
      deviceId: string,
      tokenId: string,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, void>({
        path: `/api/devices/${deviceId}/market-movements/tokens/${tokenId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Market Movements (Token Tracking)
     * @name MarketMovementsControllerTestNotify
     * @request POST:/api/devices/{deviceId}/market-movements/test
     */
    marketMovementsControllerTestNotify: (
      deviceId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/devices/${deviceId}/market-movements/test`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment requests
     * @name PaymentRequestsControllerCompletePaymentRequestV1
     * @request POST:/api/v1/payment-requests/complete/{id}
     */
    paymentRequestsControllerCompletePaymentRequestV1: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/payment-requests/complete/${id}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment requests
     * @name PaymentRequestsControllerCreatePaymentRequestV1
     * @request POST:/api/v1/payment-requests/send
     */
    paymentRequestsControllerCreatePaymentRequestV1: (
      data: CreatePaymentRequestBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/payment-requests/send`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment requests
     * @name PaymentRequestsControllerGetPaymentRequestsV1
     * @request GET:/api/v1/payment-requests
     */
    paymentRequestsControllerGetPaymentRequestsV1: (
      query: {
        /** @example 1 */
        limit: number;
        /** @example 1 */
        offset: number;
        referralId?: string;
        status?: "pending" | "paid" | "rejected";
        type: "sent" | "received";
        walletAddress?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPaymentRequestsResponseDTO, any>({
        path: `/api/v1/payment-requests`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment requests
     * @name PaymentRequestsControllerGetPendingRequestsV1
     * @request GET:/api/v1/payment-requests/pending/{referralId}
     */
    paymentRequestsControllerGetPendingRequestsV1: (
      referralId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetPendingRequestsResponseDTO, any>({
        path: `/api/v1/payment-requests/pending/${referralId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment requests
     * @name PaymentRequestsControllerRejectPaymentRequestV1
     * @request POST:/api/v1/payment-requests/reject/{id}
     */
    paymentRequestsControllerRejectPaymentRequestV1: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/payment-requests/reject/${id}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Prices
     * @name PriceControllerGetSupportedCurrenciesV1
     * @request GET:/api/v1/prices/currencies
     */
    priceControllerGetSupportedCurrenciesV1: (params: RequestParams = {}) =>
      this.request<SupportedCurrencyDTO[], any>({
        path: `/api/v1/prices/currencies`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Prices
     * @name PriceControllerGetTokensPricesV1
     * @request GET:/api/v1/prices
     */
    priceControllerGetTokensPricesV1: (
      query: {
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        bsc?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        btc?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        bxn?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        dot?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        eth?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        ltc?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        polygon?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        sol?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        ton?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        tron?: string[];
        /** @example true */
        useNewFormat?: boolean;
        vsCurrencies: any[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        xrp?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTokenPricesResponseDTO, any>({
        path: `/api/v1/prices`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Prices
     * @name PriceV2ControllerGetTokensPricesV2
     * @request GET:/api/v2/prices
     */
    priceV2ControllerGetTokensPricesV2: (
      query: {
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        bsc?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        btc?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        bxn?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        dot?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        eth?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        ltc?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        polygon?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        sol?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        ton?: string[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        tron?: string[];
        /** @example true */
        useNewFormat?: boolean;
        vsCurrencies: any[];
        /** Array of addresses. For native currency use 0x0000000000000000000000000000000000000000 */
        xrp?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTokenPricesV2ResponseDTO, any>({
        path: `/api/v2/prices`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks.Quicknode
     * @name QuicknodeBscControllerAddressEvent
     * @request POST:/api/webhooks/quicknode/bsc/address
     */
    quicknodeBscControllerAddressEvent: (
      data: QuickNodeWebhookPayloadDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/webhooks/quicknode/bsc/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks.Quicknode
     * @name QuicknodeEthControllerAddressEvent
     * @request POST:/api/webhooks/quicknode/eth/address
     */
    quicknodeEthControllerAddressEvent: (
      data: QuickNodeWebhookPayloadDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/webhooks/quicknode/eth/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks.Quicknode
     * @name QuicknodePolygonControllerAddressEvent
     * @request POST:/api/webhooks/quicknode/polygon/address
     */
    quicknodePolygonControllerAddressEvent: (
      data: QuickNodeWebhookPayloadDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/webhooks/quicknode/polygon/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks.Quicknode
     * @name QuicknodeTronControllerAddressEvent
     * @request POST:/api/webhooks/quicknode/tron/address
     */
    quicknodeTronControllerAddressEvent: (
      data: QuickNodeWebhookPayloadDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/webhooks/quicknode/tron/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Security controller
     * @name SecurityControllerCheckUrl
     * @summary Check a URL for phishing or malicious content
     * @request POST:/api/security/check-url
     */
    securityControllerCheckUrl: (
      data: CheckUrlRequestBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<CheckUrlResponseDTO, void>({
        path: `/api/security/check-url`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Security controller
     * @name SecurityControllerCheckWallet
     * @summary Check a wallet address for toxicity score and metrics
     * @request POST:/api/security/check-wallet
     */
    securityControllerCheckWallet: (
      data: CheckWalletRequestBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<CheckWalletResponseDTO, void>({
        path: `/api/security/check-wallet`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks.Quicknode.Solana
     * @name SolanaWebhookControllerAddressEvent
     * @request POST:/api/webhooks/quicknode/sol/address
     */
    solanaWebhookControllerAddressEvent: (
      data: string[],
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/webhooks/quicknode/sol/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensControllerGetAddressOwnedTokensBalanceV1
     * @request POST:/api/v1/tokens/owned/balance
     */
    tokensControllerGetAddressOwnedTokensBalanceV1: (
      data: GetAddressOwnedTokensBalanceBodyDto,
      query?: {
        /** @example true */
        forceUpdate?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAddressOwnedTokensBalanceResponseDto, any>({
        path: `/api/v1/tokens/owned/balance`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensControllerGetAddressOwnedTokensV1
     * @request POST:/api/v1/tokens/owned
     */
    tokensControllerGetAddressOwnedTokensV1: (
      data: GetAddressOwnedTokensBodyDto,
      params: RequestParams = {},
    ) =>
      this.request<GetAddressOwnedTokensResponseDto, any>({
        path: `/api/v1/tokens/owned`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensControllerGetFungibleTokenByAddressV1
     * @request GET:/api/v1/tokens
     */
    tokensControllerGetFungibleTokenByAddressV1: (
      query: {
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
        contractAddress: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTokenInfoResponseDTO, any>({
        path: `/api/v1/tokens`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensControllerGetFungibleTokenListV1
     * @request POST:/api/v1/tokens/fungible
     */
    tokensControllerGetFungibleTokenListV1: (
      data: GetFungibleListBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<GetFungibleListResponseDTO, any>({
        path: `/api/v1/tokens/fungible`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensControllerGetNonFungibleCollectionListV1
     * @request POST:/api/v1/tokens/non-fungible/collections
     */
    tokensControllerGetNonFungibleCollectionListV1: (
      data: GetNonFungibleCollectionListBodyDto,
      query?: {
        /** @example true */
        castIdToString?: boolean;
        cursor?: string;
        limit?: number;
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetNonFungibleCollectionListResponseDto, any>({
        path: `/api/v1/tokens/non-fungible/collections`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensControllerGetNonFungibleTokensV1
     * @request POST:/api/v1/tokens/non-fungible/tokens
     */
    tokensControllerGetNonFungibleTokensV1: (
      data: GetNonFungibleTokensBodyDto,
      query?: {
        /** @example true */
        castIdToString?: boolean;
        cursor?: string;
        limit?: number;
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetNonFungibleTokensResponseDto, any>({
        path: `/api/v1/tokens/non-fungible/tokens`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags History
     * @name TokensHistoryControllerGetTransfersV1
     * @request GET:/api/v1/history/transfers
     */
    tokensHistoryControllerGetTransfersV1: (
      query: {
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
        contractAddress: string;
        cursor?: string;
        limit?: number;
        skip?: number;
        tokenId?: string;
        walletAddress: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTransfersResponseDTO, any>({
        path: `/api/v1/history/transfers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of requested tokens with balances and array of chains with errors in third party side
     *
     * @tags Tokens
     * @name TokensV2ControllerGetFungibleTokenListWithBalancesV2
     * @summary Get token info and balances by chain, wallet address and token contract address
     * @request POST:/api/v2/tokens/fungible
     */
    tokensV2ControllerGetFungibleTokenListWithBalancesV2: (
      data: GetFungibleListBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<GetFungibleListWithBalancesResponseDTO, any>({
        path: `/api/v2/tokens/fungible`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensV2ControllerGetNonFungibleCollectionListV2
     * @request POST:/api/v2/tokens/non-fungible/collections
     */
    tokensV2ControllerGetNonFungibleCollectionListV2: (
      data: GetNonFungibleCollectionListBodyV2Dto,
      query?: {
        /** @example true */
        castIdToString?: boolean;
        cursor?: string;
        limit?: number;
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetNonFungibleCollectionListResponseDto, any>({
        path: `/api/v2/tokens/non-fungible/collections`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tokens
     * @name TokensV2ControllerGetNonFungibleTokensV2
     * @request POST:/api/v2/tokens/non-fungible/tokens
     */
    tokensV2ControllerGetNonFungibleTokensV2: (
      data: GetNonFungibleTokensBodyDto,
      query?: {
        /** @example true */
        castIdToString?: boolean;
        cursor?: string;
        limit?: number;
        skip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetNonFungibleTokensResponseDto, any>({
        path: `/api/v2/tokens/non-fungible/tokens`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsControllerGetTransactionFeesV1
     * @request GET:/api/v1/transactions/estimate-fee
     */
    transactionsControllerGetTransactionFeesV1: (
      query: {
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
        /**
         *
         *     Stringified JSON object for estimating transaction fee. For chain search out in schemas {Chain}EstimateFeeParamsDTO.
         *     For example, for btc - BtcEstimateFeeParamsDTO.
         *
         */
        estimateFeeParams: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTransactionFeesResponseDTO, any>({
        path: `/api/v1/transactions/estimate-fee`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsControllerGetTransactionStatusV1
     * @request GET:/api/v1/transactions/transaction-status
     */
    transactionsControllerGetTransactionStatusV1: (
      query: {
        chain:
          | "bxn"
          | "eth"
          | "bsc"
          | "polygon"
          | "btc"
          | "sol"
          | "dot"
          | "xrp"
          | "ton"
          | "ltc"
          | "tron";
        hash: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTransactionStatusResponseDTO, any>({
        path: `/api/v1/transactions/transaction-status`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsControllerSendRawTransactionV1
     * @request POST:/api/v1/transactions/send-raw-tx
     */
    transactionsControllerSendRawTransactionV1: (
      data: SendRawTransactionBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<SendRawTransactionResponseDTO, any>({
        path: `/api/v1/transactions/send-raw-tx`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsControllerSendTransactionV1
     * @request POST:/api/v1/transactions/send
     */
    transactionsControllerSendTransactionV1: (
      query: {
        /** @example "eth" */
        chain: string;
      },
      data: SendTransactionBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<SendTransactionResponseDTO, any>({
        path: `/api/v1/transactions/send`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Transactions
     * @name TransactionsControllerValidateTransactionV1
     * @request POST:/api/v1/transactions/validate
     */
    transactionsControllerValidateTransactionV1: (
      data: ValidateTxBodyDTO,
      params: RequestParams = {},
    ) =>
      this.request<ValidateTxResponseDTO, any>({
        path: `/api/v1/transactions/validate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Webhooks.Quicknode.Xrpl
     * @name XrpWebhookControllerAddressEvent
     * @request POST:/api/webhooks/quicknode/xrp/address
     */
    xrpWebhookControllerAddressEvent: (
      data: XrpEventsDTO,
      params: RequestParams = {},
    ) =>
      this.request<StatusDTO, any>({
        path: `/api/webhooks/quicknode/xrp/address`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
