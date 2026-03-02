import { CoinResponse, Coin } from "@/types/crypto";

//transformacja danych
export function mapCoinResponsToCoin(coin: CoinResponse): Coin {
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    price: coin.current_price ?? 0,
    change24h: coin.price_change_percentage_24h ?? 0,
    image: coin.image,
    high24h: coin.high_24h ?? 0,
    low24h: coin.low_24h ?? 0,
    ath: coin.ath ?? 0,
    marketCapRank: coin.market_cap_rank ?? 0,
  };
}
