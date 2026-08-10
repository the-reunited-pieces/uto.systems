import { useEffect, useState } from "react";

export function useTime() {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now());
        }, 10);

        return () => clearInterval(interval);
    }, []);

    return time;
}
