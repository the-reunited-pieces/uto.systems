import { useSysFronters } from "@/hooks/useSysFronters";
import "./fronter.css";

export function Fronter() {
    const sysFronters = useSysFronters();

    const fronters = sysFronters?.fronters
        .map((id) => sysFronters.members.find((member) => member.id === id))
        .filter((member) => member !== undefined);

    return (
        <>
            <h2>Current Fronter{fronters?.length === 1 ? "" : "s"}</h2>
            {sysFronters === undefined ? (
                "Loading..."
            ) : sysFronters === null ? (
                "Error fetching system info from API."
            ) : !fronters?.length ? (
                "No fronters registered."
            ) : (
                <div className="fronters">
                    {fronters.map(({ display_name, avatar_url }) => (
                        <>
                            <img className="fronter-avatar" src={avatar_url ?? undefined} />
                            <span className="fronter-name">{display_name}</span>
                        </>
                    ))}
                </div>
            )}
        </>
    );
}
