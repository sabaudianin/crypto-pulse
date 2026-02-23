export interface Coin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24h: string;
  marketCapUsd: string;
}

export interface CoinResponse {
  data: Coin[];
  timestamp: number;
}
