import { useQuery } from "@tanstack/react-query";
import { getTopCoins } from "@/lib/api";
import type { Coin } from "@/types/crypto";

export function useTopCoins() {
  return useQuery<Coin[], Error>({
    queryKey: ["topCoins"],
    queryFn: getTopCoins,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
