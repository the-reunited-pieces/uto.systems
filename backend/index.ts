import { fetch } from "bun";
import { gql, GraphQLClient } from "graphql-request";
import type { GitHubEvent, Repository } from "./types";

const server = Bun.serve({
    port: 5214,
    routes: {
        "/sysinfo": async () => {
            const members = await fetch("https://api.pluralkit.me/v2/systems/@me/members", {
                headers: {
                    Authorization: Bun.env.PK_TOKEN!,
                },
            }).then((res) => res.json());
            const fronters = await fetch("https://api.pluralkit.me/v2/systems/@me/fronters", {
                headers: {
                    Authorization: Bun.env.PK_TOKEN!,
                },
            }).then((res) => res.json());
            return new Response(JSON.stringify({ fronters, members }), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                },
            });
        },
        "/github-contributions-weeks": async () => {
            const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
                headers: {
                    authorization: `Bearer ${Bun.env.GITHUB_TOKEN_OLD!}`,
                },
            });

            const query = gql`
                query ($userName: String!) {
                    user(login: $userName) {
                        contributionsCollection {
                            contributionCalendar {
                                weeks {
                                    contributionDays {
                                        contributionCount
                                        date
                                    }
                                }
                            }
                        }
                    }
                }
            `;
            const variables = {
                userName: Bun.env.GITHUB_USERNAME!,
            };

            const res = await graphQLClient.request(query, variables);
            return new Response(JSON.stringify(res.user.contributionsCollection.contributionCalendar.weeks), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                },
            });
        },
        "/github-repositories": async () => {
            const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
                headers: {
                    authorization: `Bearer ${Bun.env.GITHUB_TOKEN_OLD!}`,
                },
            });

            const query = gql`
                query ($userName: String!) {
                    user(login: $userName) {
                        contributionsCollection {
                            commitContributionsByRepository {
                                repository {
                                    name
                                    url
                                }
                            }
                        }
                    }
                }
            `;
            const variables = {
                userName: Bun.env.GITHUB_USERNAME!,
            };

            const res = await graphQLClient.request(query, variables);
            const repositories = res.user.contributionsCollection.commitContributionsByRepository as Repository[];
            return new Response(
                JSON.stringify(
                    repositories.filter((repo) =>
                        ["WeAreUto", "the-reunited-pieces", "TransGG"].includes(
                            repo.repository.url?.split("/")[3] ?? "",
                        ),
                    ),
                ),
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    },
                },
            );
        },
        "/github-recent-projects": async () => {
            const res = (await fetch(`https://api.github.com/users/${Bun.env.GITHUB_USERNAME}/events`).then((res) =>
                res.json(),
            )) as GitHubEvent[];
            return new Response(
                JSON.stringify(
                    res
                        .toReversed()
                        .filter((item) => ["CreateEvent", "PushEvent"].includes(item.type!))
                        .map((item) => item.repo?.name)
                        .filter((repo) => repo != null)
                        .slice(0, 3),
                ),
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    },
                },
            );
        },
    },
});

console.log(server.url);
