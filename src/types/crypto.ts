//kontrakt danych
export interface CoinResponse {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  high_24h: number;
  low_24h: number;
  ath: number;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  image: string;
  high24h: number;
  low24h: number;
  ath: number;
}

export interface GetCoinsParams {
  page?: string;
  perPage?: string;
  order?: string;
  currency?: string;
}
