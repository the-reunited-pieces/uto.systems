import { useEffect, useState } from "react";

type Weeks = {
    contributionDays: {
        contributionCount: number;
        date: string;
    }[];
}[];

export function useGithubContributionWeeks() {
    const [weeks, setWeeks] = useState<Weeks | undefined | null>(undefined);

    useEffect(() => {
        fetch(`${process.env.BUN_PUBLIC_API}/github-contributions-weeks`)
            .then(async (res) => {
                if (!res.ok) throw null;

                const data = await res.json();
                if (!Array.isArray(data)) throw null;

                data.forEach((week: any) => {
                    if (!week) throw null;
                    if (!Array.isArray(week.contributionDays)) throw null;

                    week.contributionDays.forEach((day: any) => {
                        if (!day) throw null;
                        if (typeof day.contributionCount !== "number") throw null;
                        if (typeof day.date !== "string") throw null;
                    });
                });

                const weeks: Weeks = data;

                const date = new Date();
                date.setMonth(date.getMonth() - 1);

                setWeeks(weeks.filter((week) => new Date(week.contributionDays.at(-1)!.date) >= date));
            })
            .catch(() => setWeeks(null));
    }, []);

    return weeks;
}
