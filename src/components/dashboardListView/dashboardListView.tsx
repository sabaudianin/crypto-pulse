
import { Coin } from "@/types/crypto";
import { Heart, TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const DashboardListView = ({
    coin,
    isFavorite,
    onToggleFavorite
}: {
    coin: Coin;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void
}) => {
    const isPositive = coin.change24h > 0;

    return (
        <div className="group relative flex items-center justify-between bg-background/3 hover:bg-background/5 border border-background/5 hover:border-emerald-500/30 backdrop-blur-md px-2 py-2 rounded-2xl transition-all duration-300">
            <div className="grid grid-cols-4 w-full items-center">
                <div className="flex items-center gap-2">
                    <div className="hidden lg:block relative w-10 h-10 shrink-0">
                        <Image src={coin.image} alt={coin.name} fill className="rounded-full object-contain" />
                    </div>
                    <div>
                        <p className="font-bold text-background group-hover:text-emerald-400 transition-colors">
                            {coin.symbol.toUpperCase()}
                        </p>
                        <p className="text-[10px] text-background/30 font-medium uppercase tracking-tighter">{coin.name}</p>
                    </div>
                </div>

                <div className="text-right font-mono font-bold text-sm">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>


                <div className={cn(
                    "flex items-center justify-end gap-1 font-bold text-xs",
                    isPositive
                        ? "text-emerald-400"
                        : "text-rose-400"
                )}>
                    {isPositive
                        ? <TrendingUp className="w-3 h-3" />
                        : <TrendingDown className="w-3 h-3" />}
                    {coin.change24h.toFixed(2)}%
                </div>


                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onToggleFavorite(coin.id)}
                        className={cn(
                            "absolute top-3 right-3 p-2 rounded-xl transition-all hover:scale-110 active:scale-95",
                            isFavorite
                                ? "text-rose-500 bg-rose-500/10"
                                : "text-white/40 hover:text-rose-400"
                        )}>
                        <Heart
                            fill={isFavorite ? "currentColor" : "none"}
                            className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}