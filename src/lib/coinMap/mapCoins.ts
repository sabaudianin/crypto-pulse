import { CoinResponse, Coin } from "@/types/crypto";

//transformacja danych
export function mapCoinResponsToCoin(coin: CoinResponse): Coin {
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    image: coin.image,
    high24h: coin.high_24h,
    low24h: coin.low_24h,
    ath: coin.ath,
    marketCapRank: coin.market_cap_rank,
  };
}
