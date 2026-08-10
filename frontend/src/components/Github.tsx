import { useGithubContributionWeeks } from "@/hooks/useGithubContributionWeeks";
import { ordinal } from "@/lib/utils";
import "./github.css";

const MONTHS = "January February March April May June July August September October November December".split(" ");

export function Github() {
    const weeks = useGithubContributionWeeks();

    if (weeks === undefined)
        return (
            <>
                <h2>GitHub Contributions</h2>
                <p>Loading...</p>
            </>
        );

    if (weeks === null)
        return (
            <>
                <h2>GitHub Contributions</h2>
                <p>Error fetching contribution data from API.</p>
            </>
        );

    const date = new Date();

    const monthTotal = weeks
        .flatMap((week) => week.contributionDays)
        .filter((day) => new Date(day.date).getMonth() === date.getMonth())
        .map((day) => day.contributionCount)
        .reduce((x, y) => x + y, 0);

    const max = Math.max(...weeks.flatMap((week) => week.contributionDays.map((day) => day.contributionCount)));

    return (
        <>
            <h2>GitHub Contributions</h2>
            <div className="contribution-side-by-side">
                <div className="contribution-grid">
                    {weeks.map((week) =>
                        week.contributionDays.map((day) => {
                            const date = new Date(day.date);

                            return (
                                <div
                                    className={`contribution-square tier-${day.contributionCount === 0 ? "0" : Math.floor(((day.contributionCount - 1) / max) * 4)}`}
                                    data-title={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${MONTHS[date.getMonth()]} ${ordinal(date.getDate())}`}
                                ></div>
                            );
                        }),
                    )}
                </div>
                <div className="contribution-stats">
                    <h3>{MONTHS[date.getMonth()]}</h3>
                    <p>This month's contribution count: {monthTotal}</p>
                </div>
            </div>
        </>
    );
}
