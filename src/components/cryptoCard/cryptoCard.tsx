import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coin } from "@/types/crypto";

interface CryptoCardProps {
    coin: Coin;
}

export function CryptoCard({ coin }: CryptoCardProps) {
    const price = parseFloat(coin.priceUsd).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    const change = parseFloat(coin.changePercent24h).toFixed(2);
    const isPositive = parseFloat(change) > 0;

    return (
        <Card className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {coin.name} <span className="text-muted-foreground uppercase">{coin.symbol}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{price}</div>
                <p className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? "+" : ""}{change}% (24h)
                </p>
            </CardContent>
        </Card>
    );
}