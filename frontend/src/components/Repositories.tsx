import { useGithubRepositories } from "@/hooks/useGithubRepositories";
import { Repo } from "@/components/Repository";
import "./repositories.css";

export function Repos() {
    const repositories = useGithubRepositories();

    return (
        <>
            <div className="repos">
                {repositories
                    ?.toSorted((x, y) => x.repository.name.toLowerCase().localeCompare(y.repository.name.toLowerCase()))
                    .map((repo) => (
                        <>
                            <Repo repo={repo.repository}></Repo>
                        </>
                    ))}
            </div>
        </>
    );
}
