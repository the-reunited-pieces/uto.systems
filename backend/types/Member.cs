using System.Text.Json.Serialization;

namespace backend.types
{
    public class Member(string? id, string? name, string? display_name, string? description, string? avatar_url)
    {
        [JsonInclude]
        public readonly string? Id = id;
        [JsonInclude]
        public readonly string? Name = name;
        [JsonInclude]
        public readonly string? Display_name = display_name;
        [JsonInclude]
        public readonly string? Description = description;
        [JsonInclude]
        public readonly string? Avatar_url = avatar_url;
    }
}