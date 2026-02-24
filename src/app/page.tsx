"use client";

import { useTopCoins } from "@/hooks/useCrypto/useCrypto";
import { CryptoCard } from "@/components/cryptoCard/cryptoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { data, isLoading, isFetching, isError } = useTopCoins();


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
    <div className="relative min-h-screen w-full overflow-hidden">

      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {/* Główna siatka */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[44px_44px]"
        />

        {/* Efekt winiety/maskih */}
        <div
          className="absolute inset-0 bg-[#82899d] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_0%,#000_100%)]]"
        />

        {/* Dodatkowy blask (Glow) za napisem */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-emerald-200/20 blur-3xl rounded-full" />
      </div>

      <section className="max-w-7xl mx-auto p-6 md:p-12">

        <header className="relative mb-16 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">

              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                isFetching ? "bg-blue-400" : "bg-emerald-400"
              )}></span>
              <span className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                isFetching ? "bg-blue-500" : "bg-emerald-600"
              )}></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] ">
              {isFetching ? "Syncing with Blockchain..." : "Market Live"}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-linear-to-b from-foreground via-foreground to-foreground/20 bg-clip-text text-transparent">
            CRYPTO <span className=" bg-linear-to-b from-amber-900 via-amber-400 to-amber-200 bg-clip-text text-transparent">PULSE</span>
          </h1>

          <p className="max-w-2xl mx-auto  text-lg font-light tracking-wide">
            Real-time analytics for the next generation of digital assets.
            Built on <span className="text-foreground font-medium">TanStack v5</span> & <span className="text-foreground font-medium">AWS</span>.
          </p>
        </header>


        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full bg-foreground/5 rounded-3xl border border-foreground/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {data?.map((coin) => (
              <CryptoCard key={coin.id} coin={coin} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}