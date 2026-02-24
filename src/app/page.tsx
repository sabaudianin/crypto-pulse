"use client";

import { useTopCoins } from "@/hooks/useCrypto/useCrypto";
import { CryptoCard } from "@/components/cryptoCard/cryptoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { data, isLoading, isFetching, isError } = useTopCoins();

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-rose-500 text-lg">
        Something went wrong while fetching market data.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white">

      {/* 🔥 Background FX */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f17] via-transparent to-[#0c0f17]" />

        {/* top glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/20 blur-[160px] rounded-full" />

        {/* side glow */}
        <div className="absolute right-[-150px] top-1/3 w-[400px] h-[400px] bg-indigo-500/20 blur-[140px] rounded-full" />
      </div>

      <section className="relative max-w-[1400px] mx-auto px-6 md:px-12 py-20">

        {/* ===== HEADER ===== */}
        <header className="mb-24 text-center space-y-6">

          {/* Live badge */}
          <div className="flex items-center justify-center gap-3">
            <span className="relative flex h-3 w-3">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                  isFetching ? "bg-blue-400" : "bg-emerald-400"
                )}
              />
              <span
                className={cn(
                  "relative inline-flex rounded-full h-3 w-3",
                  isFetching ? "bg-blue-500" : "bg-emerald-500"
                )}
              />
            </span>

            <span className="text-xs font-mono uppercase tracking-[0.35em] text-white/60">
              {isFetching ? "Syncing Market..." : "Market Live"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            CRYPTO{" "}
            <span className="bg-gradient-to-b from-emerald-400 via-emerald-300 to-emerald-600 bg-clip-text text-transparent">
              PULSE
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/60 text-lg font-light tracking-wide">
            Real-time digital asset analytics powered by TanStack Query.
            Built for performance, designed for impact.
          </p>
        </header>

        {/* ===== CONTENT ===== */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-[220px] rounded-3xl bg-white/5 border border-white/10"
              />
            ))}
          </div>
        ) : (
          <>
            {/* ===== HERO ROW (2 DUŻE) ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {data?.slice(0, 2).map((coin, index) => (
                <div
                  key={coin.id}
                  className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-10 hover:scale-[1.02] hover:-translate-y-2"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <CryptoCard coin={coin} />
                </div>
              ))}
            </div>

            {/* ===== RESZTA KART ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data?.slice(2).map((coin, index) => (
                <div
                  key={coin.id}
                  className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-10 hover:scale-[1.03] hover:-translate-y-2"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <CryptoCard coin={coin} />
                </div>
              ))}
            </div>
          </>
        )}

      </section>
    </div>
  );
}