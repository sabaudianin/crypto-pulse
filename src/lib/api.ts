import { CoinResponse, Coin } from "@/types/crypto";

export async function getTopCoins(): Promise<Coin[]> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1",
  );

  if (!res.ok) {
    throw new Error("BŁad podczas pobierania danych z API");
  }

  const data: CoinResponse[] = await res.json();
  return data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    image: coin.image,
    high24h: coin.high_24h,
    low24h: coin.low_24h,
    ath: coin.ath,
  }));
}
