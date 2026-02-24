import { CoinResponse, Coin } from "@/types/crypto";
import { mapCoinResponsToCoin } from "../coinMap/mapCoins";
import type { GetCoinsParams } from "@/types/crypto";

const BASE_URL = process.env.COINGECKO_API_URL!;

export async function fetchCoins({
  page = "1",
  perPage = "20",
  order = "market_cap_desc",
  currency = "usd",
}: GetCoinsParams): Promise<Coin[]> {
  const url = `${BASE_URL}/coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  //rate limit
  if (res.status === 429) {
    console.warn("Rate limit hit");
  }
  if (!res.ok) {
    throw new Error(`API returned status: ${res.status}`);
  }

  const data: CoinResponse[] = await res.json();
  return data.map(mapCoinResponsToCoin);
}
