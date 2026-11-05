import "./repository.css";

export function Repo({ repo }: { repo: { name?: string | null; url?: string | null } }) {
    return (
        <>
            <div className="repo">
                <div className="repo-details">
                    <span>
                        <h2>
                            <a href={repo.url!}>{repo.name}</a>
                        </h2>
                    </span>
                </div>
            </div>
        </>
    );
}
