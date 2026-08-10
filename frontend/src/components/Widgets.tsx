import { useScreenDimensions } from "@/hooks/useScreenDimensions";
import { useTime } from "@/hooks/useTime";
import { useEffect, useRef, useState, type ReactNode } from "react";
import "./widgets.css";

export function Widgets({ widgets }: { widgets: ReactNode[] }) {
    const { width } = useScreenDimensions();
    const [index, setIndex] = useState(0);
    const [showArrowsUntil, setShowArrowsUntil] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current === null) return;
        ref.current.scrollTo({ left: ref.current.children[0]!.scrollWidth + 34 });
    }, [ref]);

    const now = useTime();
    const showArrows = showArrowsUntil >= now;

    if (width >= 1000)
        return (
            <div className="widget-container">
                {widgets.map((widget) => (
                    <div className="widget">{widget}</div>
                ))}
            </div>
        );
    else
        return (
            <div className="widget-container" ref={ref} onClick={() => setShowArrowsUntil(Date.now() + 2000)}>
                {widgets.map((widget, i) => (
                    <div className="widget" style={i === index ? {} : { display: "none" }}>
                        {widget}
                    </div>
                ))}
                {showArrows ? (
                    <>
                        <div
                            className="arrow left"
                            onClick={() => setIndex((i) => (i + widgets.length - 1) % widgets.length)}
                        >
                            &larr;
                        </div>
                        <div className="arrow right" onClick={() => setIndex((i) => (i + 1) % widgets.length)}>
                            &rarr;
                        </div>
                    </>
                ) : null}
            </div>
        );
}
