import { useEffect, useState } from "react";

type Repositories = {
    repository: {
        name: string;
        url: string;
    };
}[];

export function useGithubRepositories() {
    const [repositories, setRepositories] = useState<Repositories | undefined | null>(undefined);

    useEffect(() => {
        fetch(`${process.env.BUN_PUBLIC_API}/github-repositories`)
            .then(async (res) => {
                const data = await res.json();
                const repositories: Repositories = data;

                setRepositories(repositories);
            })
            .catch((error) => {
                setRepositories(null)
                console.log(error.message);
            });
    }, []);

    return repositories;
}
