import { NextRequest, NextResponse } from "next/server";
import { fetchCoins } from "@/lib/services/coins";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = searchParams.get("page") ?? undefined;
    const perPage = searchParams.get("perPage") ?? undefined;
    const order = searchParams.get("order") ?? undefined;
    const currency = searchParams.get("currency") ?? undefined;

    const coins = await fetchCoins({
      page,
      perPage,
      order,
      currency,
    });

    return NextResponse.json(coins || []);
  } catch (error) {
    console.error("Coins API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
