"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useCoins } from "@/hooks/useCrypto/useCrypto";
import { CryptoCard } from "@/components/cryptoCard/cryptoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { StatCard } from "@/components/statsCard/statsCard";
import { TrendingUp, Activity, Zap, Globe } from "lucide-react";



export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const perPage = 50;
  const { data, isLoading, isFetching, isPlaceholderData, isError } = useCoins({
    page: String(page),
    perPage: String(perPage),
  });

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-rose-500 text-lg">
        Something went wrong while fetching market data.
      </div>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-background">
      {/* poswiaty glow*/}
      <div className="absolute inset-0  overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-cyan-950 via-transparent to-blue-950" />
        {/* y glow */}
        <div className="absolute -top-50 left-1/2 -translate-x-1/2 w-175 h-175 bg-emerald-400/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-50 left-1/2 -translate-x-1/2 w-175 h-175 bg-emerald-900/10 blur-3xl rounded-full" />

        {/* x glow */}
        <div className="absolute -right-40 top-1/3 w-100 h-100 bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute -left-40 top-1/3 w-100 h-100 bg-indigo-500/20 blur-3xl rounded-full" />
      </div>

      {/* content*/}
      <div className="relative max-w-7xl mx-auto px-2 md:px-12 py-4">
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Market Status" value="Online" icon={Globe} color="text-emerald-400" />
          <StatCard label="Active Assets" value="12,482" icon={Activity} color="text-blue-400" />
          <StatCard label="Global Volume" value="$84.2B" icon={Zap} color="text-amber-400" />
          <StatCard label="BTC Dominance" value="52.4%" icon={TrendingUp} color="text-orange-400" />
        </div>


        <header className="pb-6 lg:mb-12  text-center space-y-6 pt-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            CRYPTO{" "}
            <span className="bg-linear-to-b from-emerald-400 via-emerald-300 to-emerald-600 bg-clip-text text-transparent">
              PULSE
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/60 text-lg font-semibold tracking-wide">
            Real-time digital asset analytics powered by TanStack Query. Data from CoinGecko Api.
            Built for performance, designed for impact.
          </p>
        </header>
        <div className="flex justify-between items-center p-2">
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
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-500 to-blue-500 p-px">
            <div className="w-full h-full rounded-xl flex items-center justify-center">
              <Link href="/auth/sign-in">
                <LogIn className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>


        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-50 rounded-3xl bg-white/5 border border-white/10"
              />
            ))}
          </div>
        ) : (
          <>
            {/* 2 duze karty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 mb-6">
              {data?.slice(0, 2).map((coin, index) => (
                <div
                  key={coin.id}
                  className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-10 hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <CryptoCard coin={coin} />
                </div>
              ))}
            </div>

            {/*reszta kafelkow*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8">
              {data?.slice(2).map((coin, index) => (
                <div
                  key={coin.id}
                  className="transition-all duration-700 animate-in fade-in slide-in-from-bottom-10 hover:scale-105 hover:-translate-y-1 h-full"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <CryptoCard coin={coin} />
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:text-black"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}

            disabled={page === 1}
          >
            Prev
          </button>

          <span className="font-bold">
            Page {page}
          </span>

          <button
            className="px-4 py-2 bg-blue-800 text-white rounded disabled:bg-gray-300 disabled:text-black"
            onClick={() => {

              if (!isPlaceholderData && data?.length === perPage) {
                setPage((old) => old + 1);
              }
            }}

            disabled={isPlaceholderData || (data && data.length < perPage) || (page === 2)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}