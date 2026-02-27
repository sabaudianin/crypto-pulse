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


      <div className="relative min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
        {/* 1. Background System (Consistent with landing) */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        </div>

        {/* 2. Desktop Sidebar (Hidden on Mobile) */}
        <aside className="fixed left-6 top-6 bottom-6 w-64 hidden lg:flex flex-col z-20">
          <div className="flex-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex flex-col p-6 shadow-2xl">
            {/* Logo Section */}
            <div className="px-4 mb-10">
              <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                CP <span className="text-emerald-500">PULSE</span>
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-400" : "group-hover:scale-110 transition-transform")} />
                    <span className="font-semibold text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User & Logout */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <button className="flex items-center gap-3 px-4 py-3 w-full text-white/40 hover:text-rose-400 transition-colors group">
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* 3. Main Content Area */}
        <main className="lg:pl-[20rem] p-6 lg:p-10 relative z-10 pb-24 lg:pb-10">
          {/* Top Header Section */}
          <header className="flex items-center justify-between mb-10">
            <div className="hidden lg:block">
              <h2 className="text-2xl font-bold tracking-tight">Market Dashboard</h2>
              <p className="text-white/40 text-sm">Welcome back, Chief Trader</p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Search Bar - Glass */}
              <div className="relative flex-1 lg:w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                />
              </div>

              {/* Notification & Profile */}
              <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Bell className="w-5 h-5 text-white/60" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#020617]" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-500 p-[1px]">
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </header>

          {children}
        </main>

        {/* 4. Mobile Bottom Navigation (Glassmorphism) */}
        <nav className="fixed bottom-6 left-6 right-6 h-16 lg:hidden z-50 bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around px-6 shadow-2xl">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="relative p-2 group">
                <item.icon className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive ? "text-emerald-400 scale-110" : "text-white/30"
                )} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]" />
                )}
              </Link>
            );
          })}
          <button className="p-2">
            <User className="w-6 h-6 text-white/30" />
          </button>
        </nav>
      </div>
      <Toaster />
    </Providers>
  );
}