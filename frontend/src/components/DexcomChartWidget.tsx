import { useDexcomData } from "@/hooks/useDexcomData";
import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";
import { DexcomProvider } from "./DexcomProvider";

function Inner() {
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
            height: width / 2,
            y: { axis: "right", label: "", labelArrow: "none", domain: [2, 22], ticks: [2, 4, 10, 14, 18, 22] },
            x: { labelArrow: "none", type: "time" },
            marks: [
                Plot.areaY(
                    [
                        { time: first, glucose: 4, band: "#0000" },
                        { time: last, glucose: 4, band: "#0000" },
                        { time: first, glucose: 6, band: "#8884" },
                        { time: last, glucose: 6, band: "#8884" },
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
                Plot.line(
                    [
                        { time: first, glucose: 14 },
                        { time: last, glucose: 14 },
                    ],
                    { x: "time", y: "glucose", stroke: "#ed1" },
                ),
                Plot.line(records, { x: "time", y: "glucose" }),
            ],
        });

        ref.current.append(chart);
        return () => chart.remove();
    }, [queryResult]);

    if (queryResult === undefined) return <p>Loading...</p>;
    if (queryResult === null) return <p>Error loading Dexcom data!</p>;
    if (queryResult.error) return <p>TRPC Error: {queryResult.error}</p>;

    return (
        <div>
            {queryResult.sandbox ? <b>Data below is sandbox (not real) data</b> : null}
            <div ref={ref}></div>
        </div>
    );
}

export function DexcomChartWidget() {
    return (
        <DexcomProvider>
            <h2>Glucose Chart</h2>
            <Inner />
        </DexcomProvider>
    );
}
