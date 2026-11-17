import { TRPCProvider } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "@the-reunited-pieces/dexcom-api";
import { createTRPCClient, httpBatchLink } from "@trpc/react";
import { useState, type PropsWithChildren } from "react";

export function DexcomProvider({ children }: PropsWithChildren) {
    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });
    const [trpcClient] = useState(() =>
        createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: process.env.BUN_PUBLIC_DEXCOM_TRPC! })] }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
                {children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}
