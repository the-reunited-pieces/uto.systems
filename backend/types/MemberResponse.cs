using System.Text.Json.Serialization;

namespace backend.types
{
    public class MemberResponse(string? id, string? name, string? description)
    {
        [JsonInclude]
        public readonly string? Id = id;
        [JsonInclude]
        public readonly string? Name = name;
        [JsonInclude]
        public readonly string? Description = description;
    }
}