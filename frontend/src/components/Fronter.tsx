import { useSysinfo } from "@/hooks/useSysinfo";
import "./fronter.css";

export function Fronter() {
    const sysinfo = useSysinfo();

    const fronters = sysinfo?.fronters
        .map((id) => sysinfo.members.find((member) => member.id === id))
        .filter((member) => member !== undefined);

    return (
        <>
            <h2>Current Fronter{fronters?.length === 1 ? "" : "s"}</h2>
            {sysinfo === undefined ? (
                "Loading..."
            ) : sysinfo === null ? (
                "Error fetching system info from API."
            ) : !fronters?.length ? (
                "No fronters registered."
            ) : (
                <div className="fronters">
                    {fronters.map(({ name, avatarURL }) => (
                        <>
                            <img className="fronter-avatar" src={avatarURL ?? undefined} />
                            <span className="fronter-name">{name}</span>
                        </>
                    ))}
                </div>
            )}
        </>
    );
}
