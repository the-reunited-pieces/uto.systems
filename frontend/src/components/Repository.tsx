import "./repository.css";

export function Repo({ repo }: { repo: { name?: string | null; url?: string | null } }) {
    return (
        <>
            <a href={repo.url!} target="_blank">
                <div className="repo">
                    <div className="repo-details">
                        <span>
                            <h2>{repo.name}</h2>
                            <p className="clickHere">Click here!</p>
                        </span>
                    </div>
                </div>
            </a>
        </>
    );
}
