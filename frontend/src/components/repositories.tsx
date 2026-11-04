import { useGithubRepositories } from "@/hooks/useGithubRepositories";


export function Repositories() {
    const repos = useGithubRepositories();

    console.log(repos);
    if (repos === undefined)
        return (
            <>
                <h2>GitHub Contributions</h2>
                <p>Loading...</p>
            </>
        );

    if (repos === null)
        return (
            <>
                <h2>GitHub Contributions</h2>
                <p>Error fetching contribution data from API.</p>
            </>
        );

    return (
        <>
            <h2>GitHub repos</h2>
            <div className="contribution-side-by-side">
                <ul>
                  {repos.map((repo) => (
                    <>
                      <li>{repo.repositories[0]?.name}</li>
                      <li>{repo.repositories[0]?.url}</li>
                    </>
                  ))}
                </ul>
            </div>
        </>
    );
}
