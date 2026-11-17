import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const FIVE_MINS = 5 * 60 * 1000;

export interface DexcomRecord {
    time: Date;
    glucose: number;
    trend: string | undefined;
}

export function useDexcomData() {
    const trpc = useTRPC();

    const now = () => Math.floor(Date.now() / FIVE_MINS) * FIVE_MINS;
    const [end, setEnd] = useState(now());

    useEffect(() => {
        const interval = setInterval(() => setEnd(now), 1000);
        return () => clearInterval(interval);
    }, []);

    const { status, data } = useQuery(trpc.egvs.queryOptions({ start: end - 24 * 60 * 60 * 1000, end }));
    if (status === "error") return null;
    if (!data) return undefined;

    return {
        error: data.error,
        value: data.value?.records
            .map((record) => ({ time: new Date(record.systemTime), glucose: record.valueInMmoll, trend: record.trend }))
            .filter((record): record is DexcomRecord => record.glucose !== undefined),
        sandbox: "sandbox" in data && data.sandbox,
    };
}
