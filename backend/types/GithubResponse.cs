using System.Text.Json.Serialization;

namespace backend.types
{
    public class GithubResponse
    {
        [JsonInclude]
        public GithubData? data;
    }

    public class GithubData
    {
        [JsonInclude]
        public GithubUser? user;
    }

    public class GithubUser
    {
        [JsonInclude]
        public GithubContributionsCollection? contributionsCollection;
    }

    public class GithubContributionsCollection
    {
        [JsonInclude]
        public GithubContributionCalendar? contributionCalendar;
    }

    public class GithubContributionCalendar
    {
        [JsonInclude]
        public GithubWeek[]? weeks;
    }

    public class GithubWeek
    {
        [JsonInclude]
        public GithubContributionDay[]? contributionDays;
    }

    public class GithubContributionDay
    {
        [JsonInclude]
        public int? contributionCount;
        [JsonInclude]
        public string? date;
    }
}