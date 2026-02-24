
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coin } from "@/types/crypto";
import { cn } from "@/lib/utils";

export function CryptoCard({ coin }: { coin: Coin }) {
    if (!coin) return null;
    const isPositive = coin.change24h > 0;

    return (
        <Card className={cn(
            "relative group overflow-hidden transition-all duration-300",
            "bg-foreground/5 backdrop-blur-xl border-foreground/10",
            "hover:bg-foreground/10 hover:border-foreground/20 hover:-translate-y-1",
            "before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br",
            isPositive ? "before:from-emerald-500/10" : "before:from-rose-500/10",
            "before:to-transparent before:opacity-0 group-hover:opacity-100 before:transition-opacity"
        )}>


            <div className={cn(
                "absolute -right-4 -top-4 w-1/2 h-1/2 blur-2xl rounded-full opacity-20 transition-colors",
                isPositive ? "bg-emerald-500" : "bg-rose-500"
            )} />

            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-semibold flex items-center gap-3">
                    <div className="relative w-8 h-8 p-1 rounded-full bg-foreground/10 ring-1 ring-foreground/20">
                        <Image
                            src={coin.image}
                            alt={coin.name}
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-foreground font-bold tracking-tight">{coin.name}</span>
                        <span className="text-xs text-gray-700 uppercase font-medium">{coin.symbol}</span>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="text-2xl font-black text-foreground tracking-tighter">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>

                <div className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 mt-2 rounded-full text-xs font-bold",
                    isPositive
                        ? " text-emerald-700 ring-1 ring-emerald-500/20"
                        : " text-rose-700 ring-1 ring-rose-500/20"
                )}>
                    {isPositive ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
                </div>
            </CardContent>
        </Card>
    );
}