import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { GetCoinsParams } from "@/types/crypto";
import type { Coin } from "@/types/crypto";

function buildCoinsQuery(params: GetCoinsParams) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.perPage) query.set("perPage", String(params.perPage));
  if (params.order) query.set("order", params.order);
  if (params.currency) query.set("currency", params.currency);

  return `/api/coins?${query.toString()}`;
}

export function useCoins(params: GetCoinsParams) {
  return useQuery<Coin[], Error>({
    queryKey: ["coins", params],
    queryFn: async () => {
      const res = await fetch(buildCoinsQuery(params));

      if (!res.ok) {
        //wyciagmay bład z serwera jesli istnieje
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to fetch coins");
      }

      return res.json();
    },
    placeholderData: keepPreviousData,
  });
}
