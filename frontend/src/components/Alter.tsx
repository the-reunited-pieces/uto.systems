import "./alter.css";

export function Alter({ alter }: { alter: { name?: string | null; avatar_url?: string | null; description?: string | null } }) {

    return (
        <>
            <div className="alter">
                <div className="alter-details">
                    <h2>{alter.name}</h2>
                    <span>{alter.description}</span>
                </div>
                <img className="alter-avatar" src={alter.avatar_url ?? undefined} />
            </div>
        </>
    );
}
