
import Link from "next/link";
import { ShieldCheck, ChevronLeft, LockKeyhole } from "lucide-react";

import { Providers } from "@/provider/auth-provider";
import { cn } from "@/lib/utils";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div className="relative min-h-screen w-full flex items-center justify-center p-2 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-950/20 to-emerald-900/10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-500/10 blur-3xl rounded-full" />
                    <div className="absolute -top-[10%] -left-[10%] w-100 h-100 bg-indigo-500/20 blur-3xl rounded-full" />
                </div>
                <div className="relative z-10 w-full max-w-3xl animate-in fade-in zoom-in-95 duration-500">
                    <div className="text-center py-4">
                        <h1 className="text-3xl md:text-8xl font-black tracking-tighter leading-none text-background">
                            CRYPTO{" "}
                            <span className="bg-linear-to-b from-emerald-400 via-emerald-300 to-emerald-600 bg-clip-text text-transparent">
                                PULSE
                            </span>
                        </h1>
                    </div>
                    <div className={cn(
                        "relative overflow-hidden rounded-2xl border border-background/10 bg-background/3 backdrop-blur-2xl shadow-2xl",
                        "before:absolute before:inset-0 before:-z-10 before:bg-linear-to-b before:from-background/5 before:to-transparent"
                    )}>
                        <div className="pt-4 text-center">
                            <div className="inline-flex items-center justify-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-2 group">
                                <LockKeyhole className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter text-background">
                                SECURE <span className="text-emerald-500">ACCESS</span>
                            </h2>
                            <p className="text-background/40 text-sm mt-2 font-medium">
                                Authorized personnel only
                            </p>
                        </div>

                        <div className="pb-4">
                            <div className="relative">
                                <div className="absolute -left-8 top-0 h-px w-16 bg-linear-to-r from-transparent to-emerald-500/20" />
                                <div className="absolute -right-8 top-0 h-px w-16 bg-linear-to-l from-transparent to-emerald-500/20" />

                                <div className="auth-form-wrapper">
                                    {children}
                                </div>
                            </div>
                            <div className="w-full text-center">

                                <Link
                                    href="/"
                                    className="group mb-8 inline-flex items-center gap-2 text-sm text-background hover:text-emerald-400 transition-colors "
                                >
                                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                    Back to Terminal
                                </Link>
                            </div>

                        </div>
                        <div className="bg-background/5 border-t border-background/5 py-4 px-8 flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
                            <span className="text-xs uppercase tracking-widest text-background/30 font-bold">
                                End-to-End Encrypted
                            </span>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-xs text-background/20 uppercase tracking-widest font-bold">
                        Crypto Pulse Protocol v2.6.0
                    </p>
                </div>
            </div>
        </Providers>
    );
}