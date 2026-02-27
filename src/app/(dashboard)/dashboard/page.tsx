"use client";

import { useCoins } from "@/hooks/useCrypto/useCrypto";
import { CryptoCard } from "@/components/cryptoCard/cryptoCard";
import { Skeleton } from "@/components/ui/skeleton";

import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const { data, isLoading, isError } = useCoins({
        page: "1",
        perPage: "50",
    });

    if (isError) return (
        <div className="flex items-center justify-center h-[50vh] text-rose-500 font-bold">
            Failed to connect to the blockchain network.
        </div>
    );

    return (

        <>
            <RedirectToSignIn />
            <SignedIn>
                <div className="space-y-10 animate-in fade-in duration-700">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">Market Assets</h3>
                            <p className="text-white/40 text-sm">Top performing assets in the last 24h</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-2" />
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Live Feed</span>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {isLoading ? (
                            [...Array(8)].map((_, i) => (
                                <Skeleton key={i} className="h-48 rounded-[2rem] bg-white/5 border border-white/10" />
                            ))
                        ) : (
                            data?.map((coin, index) => (
                                <div
                                    key={coin.id}
                                    className="animate-in fade-in slide-in-from-bottom-4"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <CryptoCard coin={coin} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </SignedIn>
        </>
    );
}


