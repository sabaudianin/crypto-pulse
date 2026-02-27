"use client";

import {
  LayoutDashboard,
  Wallet,
  Heart,
  Settings,
  LogOut,
  Bell,
  Search,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Providers } from "@/provider/auth-provider";
import { Toaster } from "sonner";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: Wallet },
  { name: "Watchlist", href: "/dashboard/watchlist", icon: Heart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Providers>
      <section className="w-full relative p-2 min-h-screen  bg-[#020617] text-white selection:bg-emerald-500/30">



        <div className="max-w-5xl mx-auto flex items-center justify-between">

          <h1 className="text-xl  font-black tracking-tighter leading-none text-background">
            CRYPTO{" "}
            <span className="bg-linear-to-b from-emerald-400 via-emerald-300 to-emerald-600 bg-clip-text text-transparent">
              PULSE
            </span>
          </h1>

          <div className="flex items-center justify-end gap-4">

            <div className="flex gap-2 items-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-2" />
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Live Feed</span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-500 p-[1px]">
              <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>

          </div>
        </div>

        <main className="max-w-7xl mx-auto  lg:p-10 relative z-10 pb-24 lg:pb-10">
          {children}
        </main>



      </section>
      <Toaster />
    </Providers>
  );
}