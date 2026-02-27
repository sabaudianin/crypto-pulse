"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { Providers } from "@/provider/auth-provider";
import { Toaster } from "sonner";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <section className="w-full relative p-2 min-h-screen  bg-stone-900 text-white selection:bg-emerald-500/30">
        <div className="mb-2 max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="p-2 text-xl md:text-2xl lg:text-4xl font-black tracking-tighter leading-none text-background">
            CRYPTO{" "}
            <span className="bg-linear-to-b from-emerald-400 via-emerald-300 to-emerald-600 bg-clip-text text-transparent">
              PULSE
            </span>
          </h1>

          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-500 to-blue-500 p-px">
            <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
              <Link href="/">
                <LogOut className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

        </div>

        <div className="flex gap-2 items-center justify-center w-full">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-white/30 font-bold">Live Feed</span>
        </div>
        <main className="max-w-7xl mx-auto  lg:p-10 relative z-10 pb-24 lg:pb-10">
          {children}
        </main>
      </section>
      <Toaster />
    </Providers>
  );
}