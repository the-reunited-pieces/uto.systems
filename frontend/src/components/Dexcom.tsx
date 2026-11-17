import { useDexcomData, type DexcomRecord } from "@/hooks/useDexcomData";
import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";
import "./dexcom.css";
import { DexcomProvider } from "./DexcomProvider";

const trendArrows: Record<string, string> = {
    doubleUp: "⇈",
    singleUp: "↑",
    fortyFiveUp: "↗",
    flat: "→",
    fortyFiveDown: "↘",
    singleDown: "↓",
    doubleDown: "⇊",
    none: "⋯",
    notComputable: "✗",
    rateOutOfRange: "‼",
};

function displayRecord(record: DexcomRecord) {
    return `${record.glucose.toFixed(1)} ${trendArrows[record.trend ?? ""] ?? ""} at ${record.time.getHours().toString().padStart(2, "0")}:${record.time.getMinutes().toString().padStart(2, "0")}`;
}

function DexcomInner() {
    const queryResult = useDexcomData();
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number | undefined>(undefined);

    const updateWidth = () => setWidth(ref.current?.clientWidth);

    useEffect(() => {
        const attempt = () => {
            if (width !== undefined) return;
            updateWidth();
            setTimeout(attempt, 10);
        };

        attempt();

        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const records = queryResult?.value;
        if (!records || !ref.current || width === undefined) return;

        const first = records.at(-1)!.time;
        const last = records[0]!.time;

        const chart = Plot.plot({
            width,
            y: { axis: "right", grid: true, domain: [2, 22] },
            x: { type: "time" },
            marks: [
                Plot.areaY(
                    [
                        { time: first, glucose: 2, band: "#0000" },
                        { time: last, glucose: 2, band: "#0000" },
                        { time: first, glucose: 2, band: "#f005" },
                        { time: last, glucose: 2, band: "#f005" },
                        { time: first, glucose: 6, band: "#8884" },
                        { time: last, glucose: 6, band: "#8884" },
                        { time: first, glucose: 4, band: "#0000" },
                        { time: last, glucose: 4, band: "#0000" },
                        { time: first, glucose: 8, band: "#e2d11188" },
                        { time: last, glucose: 8, band: "#e2d11188" },
                    ],
                    { x: "time", y: "glucose", fill: "band" },
                ),
                Plot.line(
                    [
                        { time: first, glucose: 4 },
                        { time: last, glucose: 4 },
                    ],
                    { x: "time", y: "glucose", stroke: "#d00" },
                ),
                Plot.line(records, { x: "time", y: "glucose", tip: "x", title: displayRecord }),
            ],
        });

        ref.current.append(chart);
        return () => chart.remove();
    }, [queryResult, width]);

    if (queryResult === undefined) return <p>Loading...</p>;
    if (queryResult === null) return <p>Error loading Dexcom data!</p>;
    if (queryResult.error) return <p>TRPC Error: {queryResult.error}</p>;

    const records = queryResult.value!;

    if (records.length === 0) {
        return <h1>No data available in the past 24h!</h1>;
    }

    const values = records.map((record) => record.glucose);
    const latest = records[0]!;

    let weightedSum = 0;
    let weightedDenominator = 0;

    for (let index = 0; index < records.length - 1; index++) {
        const left = records[index]!;
        const right = records[index + 1]!;
        const range = left.time.getTime() - right.time.getTime();
        weightedSum += ((left.glucose + right.glucose) / 2) * range;
        weightedDenominator += range;
    }

    const average = records.length === 1 ? records[0]!.glucose : weightedSum / weightedDenominator;

    return (
        <>
            {queryResult.sandbox ? <h1>Data below is sandbox (not real) data</h1> : null}
            <div id="container">
                <div id="chart" ref={ref}></div>
                <div id="stats">
                    <h1>Statistics</h1>
                    <h2>Current</h2>
                    <p>{displayRecord(latest)}</p>
                    <h2>Past 24h Max</h2>
                    <p>{Math.max(...values).toFixed(1)}</p>
                    <h2>Past 24h Min</h2>
                    <p>{Math.min(...values).toFixed(1)}</p>
                    <h2>Past 24h Average</h2>
                    <p>{average.toFixed(1)}</p>
                </div>
            </div>
        </>
    );
}

export function Dexcom() {
    return (
        <DexcomProvider>
            <DexcomInner />
        </DexcomProvider>
    );
}
