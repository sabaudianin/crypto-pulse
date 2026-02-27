import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

export const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => {
    return (
        <div className="bg-background/10 backdrop-blur-md border border-background/10 p-5 rounded-[2rem] flex items-center gap-4 hover:bg-background/5 transition-all">
            <div className={cn("p-3 rounded-2xl bg-background/5 border border-background/10", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-widest text-background/30 font-bold">{label}</p>
                <p className="text-lg font-black">{value}</p>
            </div>
        </div>
    );
}

// import { TrendingUp, Activity, Zap, Globe } from "lucide-react";
// <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//     <StatCard label="Market Status" value="Online" icon={Globe} color="text-emerald-400" />
//     <StatCard label="Active Assets" value="12,482" icon={Activity} color="text-blue-400" />
//     <StatCard label="Global Volume" value="$84.2B" icon={Zap} color="text-amber-400" />
//     <StatCard label="BTC Dominance" value="52.4%" icon={TrendingUp} color="text-orange-400" />
// </section>