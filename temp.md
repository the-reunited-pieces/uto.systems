type GithubData = {
    contributionsCollection: GithubContributionsCollection;
}[];

type GithubContributionsCollection = {
    contributionCalendar: GithubContributionCalendar;
    commitContributionsByRepository: CommitContributionsByRepository;
}

type CommitContributionsByRepository = {
    Repositories: Repository[];
}

type Repository = {
    name: string;
    url: string;
}

type GithubContributionCalendar = {
    weeks: GithubWeek[];
}

type GithubWeek = {
    contributionDays: GithubContributionDay[];
}

type GithubContributionDay = {
    contributionCount: number;
    date: string;
}