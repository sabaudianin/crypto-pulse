export interface CoinResponse {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  image: string;
}
