"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coin } from "@/types/crypto";
import { cn } from "@/lib/utils";

export function CryptoCard({ coin }: { coin: Coin }) {
    const isPositive = coin.change24h > 0;

    // animacja zmiany ceny
    const prevPrice = useRef(coin.price);
    const [flash, setFlash] = useState<"up" | "down" | null>(null);
    const [, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            if (coin.price > prevPrice.current) {
                setFlash("up");
            } else if (coin.price < prevPrice.current) {
                setFlash("down");
            }
        });

        const timeout = setTimeout(() => startTransition(() => setFlash(null)), 600);
        prevPrice.current = coin.price;

        return () => clearTimeout(timeout);
    }, [coin.price]);

    return (
        <Card
            className={cn(
                "relative group overflow-hidden transition-all duration-500",
                "bg-white/5 backdrop-blur-2xl border border-white/10",
                "hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40",
                flash === "up" && "ring-2 ring-emerald-400/60",
                flash === "down" && "ring-2 ring-rose-400/60"
            )}
        >
            {/* Shine sweep effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-full top-0 h-full w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
            </div>

            {/* Gradient glow background */}
            <div
                className={cn(
                    "absolute -right-10 -top-10 w-40 h-40 blur-3xl opacity-30 transition-colors duration-500",
                    isPositive ? "bg-emerald-400/40" : "bg-rose-400/40"
                )}
            />

            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-4">

                    <div
                        className={cn(
                            "relative w-12 h-12 rounded-2xl p-2 transition-all duration-300",
                            "bg-white/10 backdrop-blur-md border border-white/20",
                            "group-hover:scale-110 group-hover:rotate-3"
                        )}
                    >
                        <Image
                            src={coin.image}
                            alt={coin.name}
                            fill
                            className="object-contain"
                        />
                    </div>


                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight text-white">
                            {coin.name}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                            {coin.symbol}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent>

                <div
                    className={cn(
                        "text-4xl font-extrabold tracking-tight tabular-nums transition-colors duration-300",
                        flash === "up" && "text-emerald-400",
                        flash === "down" && "text-rose-400",
                        !flash && "text-white"
                    )}
                >
                    $
                    {coin.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </div>


                <div
                    className={cn(
                        "inline-flex items-center gap-2 px-4 py-1.5 mt-4 rounded-full text-md font-semibold transition-all duration-300 bg-white/90",
                        isPositive
                            ? " text-emerald-600 ring-1 ring-emerald-500/30"
                            : " text-pink-600 ring-1 ring-rose-500/30"
                    )}
                >
                    <span className="text-base">
                        {isPositive ? "▲" : "▼"}
                    </span>
                    {Math.abs(coin.change24h).toFixed(2)}%
                </div>
            </CardContent>
        </Card>
    );
}