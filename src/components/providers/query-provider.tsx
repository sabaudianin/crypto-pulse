"use client";
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";



// Tworzymy instancję QueryClient wewnątrz useState, aby uniknąć problemów z renderowaniem po stronie serwera (SSR)

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30000,
                refetchInterval: 60000,
            }
        }
    }))
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
