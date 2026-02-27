import { CoinResponse, Coin } from "@/types/crypto";
import { mapCoinResponsToCoin } from "../coinMap/mapCoins";
import type { GetCoinsParams } from "@/types/crypto";

//własna klasa błedu
export class CoinServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    //public =>  this.statusCode = statusCode samo sie dzieje - stwórz pole o tej nazwie i od razu przypisz wartość
  ) {
    super(message);
    //wywołanie konstruktora klasy rodzica(konstruktora Error)
    this.name = "CoinServiceError";
  }
}

const BASE_URL = process.env.COINGECKO_API_URL!;

export async function fetchCoins({
  page = "1",
  perPage = "50",
  order = "market_cap_desc",
  currency = "usd",
}: GetCoinsParams): Promise<Coin[]> {
  // const url = `${BASE_URL}/coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}`;

  //new URl zmaiast templata bezpieczny encoding
  const url = new URL(`${BASE_URL}/coins/markets`);
  url.searchParams.set("vs_currency", currency);
  url.searchParams.set("order", order);
  url.searchParams.set("per_page", perPage);
  url.searchParams.set("page", page);
  url.searchParams.set("x_cg_demo_api_key", process.env.COINGECKO_API_KEY!);

  //ocluga bledu sieci osobno od http

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });
  } catch {
    throw new CoinServiceError("Can't connect to APi Coin Geco", 503);
  }

  //RAte limit
  if (res.status === 429) {
    console.warn("Api rate Limit Hit");
    throw new CoinServiceError("Rate limit exceeded. Try again latere", 429);
  }

  if (!res.ok) {
    throw new CoinServiceError(`APi Error status: ${res.status}`, 502);
  }

  const data: CoinResponse[] = await res.json();
  return data.map(mapCoinResponsToCoin);
}
