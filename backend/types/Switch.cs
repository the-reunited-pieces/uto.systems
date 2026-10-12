using System.Text.Json.Serialization;

namespace backend.types
{
    public class Switch(string? Id, DateTime? Timestamp, Member[]? Members)
    {
        [JsonInclude]
        public string? id = Id;
        [JsonInclude]
        public DateTime? timestamp = Timestamp;
        [JsonInclude]
        public Member[]? members = Members;
    }
}