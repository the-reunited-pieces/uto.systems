using System.Text.Json.Serialization;

namespace backend.types
{
    public class GithubEvent
    {
        [JsonInclude]
        public string? type;
        [JsonInclude]
        public GithubEventRepo? repo;
    }

    public class GithubEventRepo
    {
        [JsonInclude]
        public string? name;
    }
}