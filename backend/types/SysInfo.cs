using System.Text.Json.Serialization;

namespace backend.types
{
    public class SysInfo(string[]? fronters, Member[]? members)
    {
        [JsonInclude]
        public string[]? Fronters = fronters;
        [JsonInclude]
        public Member[]? Members = members;
    }
}