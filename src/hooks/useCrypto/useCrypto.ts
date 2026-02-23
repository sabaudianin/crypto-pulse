import { useQuery } from "@tanstack/react-query";
import { getTopCoins } from "@/lib/api";

export function useTopCoins() {
  return useQuery({
    queryKey: ["topCoins"],
    queryFn: getTopCoins,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    select: (res) => res.data,
    // const { data } = useTopCoins(); w komponencie, zamiast data?.data....
  });
}
