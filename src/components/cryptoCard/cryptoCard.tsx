"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
                "flex flex-col h-full relative gap-0 md:gap-6 py-2 md:py-4 group overflow-hidden transition-all duration-500",
                "bg-white/5 backdrop-blur-2xl border border-white/10",
                "hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40",
                flash === "up" && "ring-2 ring-emerald-400/60",
                flash === "down" && "ring-2 ring-rose-400/60"
            )}
        >
            {/* Shine sweep  */}
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

            <CardHeader className="flex items-center justify-between px-2 md:min-h-16">
                <CardTitle className="flex items-center gap-4">

                    <div
                        className={cn(
                            "relative w-8 h-8 md:w-12 md:h-12 rounded-2xl p-2 transition-all duration-300",
                            "bg-white/10 backdrop-blur-md border border-white/20",
                            "group-hover:scale-110 group-hover:rotate-3"
                        )}
                    >
                        <Image
                            src={coin.image}
                            alt={coin.name}
                            fill
                            className="object-contain"
                            sizes="auto"
                        />
                    </div>


                    <div className="flex flex-col">
                        <span className="font-semibold tracking-tight text-white">
                            {coin.name}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                            {coin.symbol}
                        </span>
                    </div>
                </CardTitle>
                <CardTitle className="flex items-center">



                    <div className="flex flex-col">
                        <span className="text-xs font-bold tracking-tight text-white text-center">
                            ATH:
                        </span>
                        <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                            ${coin.ath.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 4,
                            })}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col justify-center h-full">

                <div
                    className={cn(
                        "text-xl md:text-4xl font-extrabold tracking-tight tabular-nums transition-colors duration-300 text-center",
                        flash === "up" && "text-emerald-400",
                        flash === "down" && "text-rose-400",
                        !flash && "text-white"
                    )}
                >
                    $
                    {coin.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                    })}
                </div>

            </CardContent>

            <CardFooter className="px-3 flex justify-between items-end w-full">
                <div className="flex justify-between items-center w-full">

                    <div
                        className={cn(
                            "inline-flex items-center gap-2 px-2 py-1.5 rounded-full font-semibold transition-all duration-300 bg-white/90 text-sm ",
                            isPositive
                                ? " text-emerald-600 ring-1 ring-emerald-500/30"
                                : " text-pink-600 ring-1 ring-rose-500/30"
                        )}
                    >
                        <span className="text-sm">
                            {isPositive ? "▲" : "▼"}
                        </span>
                        {Math.abs(coin.change24h).toFixed(2)}%
                    </div>

                    <div className="self-end pb-1 flex flex-col items-end justify-end text-white/70 font-semibold">
                        <span className="text-xxs lg:text-xs  tracking-tight text-center">
                            High 24h : $ {coin?.high24h.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 4,
                            })}
                        </span>
                        <span className="text-xxs lg:text-xs tracking-tight text-center">
                            Low 24h : $ {coin.low24h.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 4,
                            })}
                        </span>
                    </div>

                </div>


            </CardFooter>
        </Card>
    );
}