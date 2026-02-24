"use client";

import { useTopCoins } from "@/hooks/useCrypto/useCrypto";
import { CryptoCard } from "@/components/cryptoCard/cryptoCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data, isLoading, isError } = useTopCoins();


  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-30 w-full rounded-xl" />
        ))}
      </div>
    );
  }


  if (isError) {
    return <div className="p-6 text-red-500">Błąd podczas pobierania kursów...</div>;
  }


  return (
    <section className="p-6">
      <h1 className="mb-6 text-5xl font-black text-center  md:text-7xl  tracking-widest ">Crypto Pulse Live</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
    </section>
  );
}