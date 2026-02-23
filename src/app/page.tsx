"use client";

import { useTopCoins } from "@/hooks/useCrypto/useCrypto";
import { CryptoCard } from "@/components/cryptoCard/cryptoCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data, isLoading, isError } = useTopCoins();

  // 1. Stan ładowania (UX!)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // 2. Stan błędu
  if (isError) {
    return <div className="p-6 text-red-500">Błąd podczas pobierania kursów...</div>;
  }

  // 3. Render właściwy
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Crypto Pulse Live</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}