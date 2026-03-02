import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

export const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => {
    return (
        <div className="bg-background/10 backdrop-blur-md border border-background/10 p-1 md:p-5 rounded-2xl flex items-center gap-2 hover:bg-background/5 transition-all">
            <div className={cn("p-1 rounded-2xl bg-background/5 border border-background/10", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs uppercase tracking-widest text-background/30 font-bold">{label}</p>
                <p className=" font-black">{value}</p>
            </div>
        </div>
    );
}

