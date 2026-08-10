import { useGithubRecentProjects } from "@/hooks/useGithubRecentProjects";

export function RecentProject() {
    const projects = useGithubRecentProjects();

    return (
        <>
            <h2>Most Recent Project{projects?.length === 1 ? "" : "s"}</h2>
            {projects === undefined ? (
                <p>Loading...</p>
            ) : projects === null ? (
                <p>Error loading recent projects from API.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li>
                            <a href={`https://github.com/${project}`} target="_blank">
                                {project.split("/")[1]}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
