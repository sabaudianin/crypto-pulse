import { NextRequest, NextResponse } from "next/server";
import { fetchCoins } from "@/lib/services/coins";
import { CoinServiceError } from "@/lib/services/coins";

//validacja ordera
const VALID_ORDERS = [
  "market_cap_desc",
  "market_cap_asc",
  "volume_desc",
] as const;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page") ?? undefined;
  const perPage = searchParams.get("perPage") ?? undefined;
  const order = searchParams.get("order") ?? undefined;
  const currency = searchParams.get("currency") ?? undefined;

  //early validation
  if (perPage && Number(perPage) > 50) {
    return NextResponse.json({ error: "PerPage limit 50" }, { status: 400 });
  }

  if (order && VALID_ORDERS.includes(order as (typeof VALID_ORDERS)[number])) {
    return NextResponse.json({ error: "Order not valid" }, { status: 400 });
  }
  try {
    const coins = await fetchCoins({
      page,
      perPage,
      order,
      currency,
    });
    return NextResponse.json(coins);

    //typy błedów teraz mamy odseparowane dzieki CoinServiceError patzr lib/services/coins.ts
  } catch (error) {
    if (error instanceof CoinServiceError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    console.error("Coins API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
