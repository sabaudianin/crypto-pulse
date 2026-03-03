"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useCoins } from "@/hooks/useCrypto/useCrypto";
import { CryptoCard } from "@/components/cryptoCard/cryptoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutGrid, List } from "lucide-react";
import { DashboardListView } from "@/components/dashboardListView/dashboardListView";
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { cn } from "@/lib/utils";

export default function DashboardPageUser() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window === "undefined") return [];
        const stored = localStorage.getItem("favorites");
        return stored
            ? JSON.parse(stored)
            : []
    })
    const { data, isLoading, isError } = useCoins({
        page: "1",
        perPage: "50",
    });


    useEffect(() => {
        if (typeof window !== undefined) {
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }
    }, [favorites])


    const toggleFavorites = useCallback((coinId: string) => {
        setFavorites(prev => prev.includes(coinId)
            ? prev.filter(id => id !== coinId)
            : [...prev, coinId])
    }, [])


    const sortedData = useMemo(() => {
        if (!data) return null;
        return data
            .slice()
            .sort((a, b) => {
                const aIsFav = favorites.includes(a.id);
                const bIsFav = favorites.includes(b.id);
                if (aIsFav === bIsFav) return 0;
                return aIsFav ? -1 : 1
            })
    }, [favorites, data])

    if (isError) return (
        <div className="flex items-center justify-center h-[50vh] text-rose-500 font-bold">
            Failed to connect to the blockchain network.
        </div>
    );
    return (
        <>
            <RedirectToSignIn />
            <SignedIn>
                <section className="flex flex-col">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div>
                            <p className="text-white/40 text-sm">Top performing assets in the last 24h</p>
                        </div>
                        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === "grid" ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "text-white/40 hover:text-white"
                                )}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === "list" ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "text-white/40 hover:text-white"
                                )}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-3"}>
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className={cn("bg-white/5 border border-white/10 rounded-xl", viewMode === "grid" ? "h-48" : "h-16")} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {viewMode === "grid" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                    {data?.map((coin) => (
                                        <CryptoCard
                                            key={coin.id}
                                            coin={coin}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-4 px-2  py-2 text-xxs uppercase tracking-widest text-white/20 font-black text-center">
                                        <span className="text-left">Asset</span>
                                        <span className="">Price</span>
                                        <span className="text-right">24h Change</span>
                                        <span className="text-right">Action</span>
                                    </div>
                                    {sortedData?.map((coin) => (
                                        <DashboardListView
                                            key={coin.id}
                                            coin={coin}
                                            onToggleFavorite={toggleFavorites}
                                            isFavorite={favorites.includes(coin.id)}
                                        />))}
                                </div>
                            )}
                        </>
                    )}
                </section>
            </SignedIn>
        </>
    );
}


