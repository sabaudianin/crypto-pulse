import { CoinResponse } from "@/types/crypto";

export async function getTopCoins(): Promise<CoinResponse> {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=10");

  if (!res.ok) {
    throw new Error("BŁad podczas pobierania danych z API");
  }
  return res.json();
}
