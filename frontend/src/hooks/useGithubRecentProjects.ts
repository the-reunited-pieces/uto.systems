import { useEffect, useState } from "react";

export function useGithubRecentProjects() {
    const [projects, setProjects] = useState<string[] | undefined | null>(undefined);

    useEffect(() => {
        fetch(`${process.env.BUN_PUBLIC_API}/github-recent-projects`)
            .then(async (res) => {
                if (!res.ok) throw null;

                const data = await res.json();
                if (!Array.isArray(data)) throw null;
                if (data.some((item) => typeof item !== "string")) throw null;

                setProjects(data);
            })
            .catch(() => setProjects(null));
    }, []);

    return projects;
}
