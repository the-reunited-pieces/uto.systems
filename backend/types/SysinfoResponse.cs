using System.Text.Json.Serialization;

namespace backend.types
{
    public class SysinfoResponse(string[] fronters, MemberResponse[] members)
    {
        [JsonInclude]
        public readonly string[] Fronters = fronters;
        [JsonInclude]
        public readonly MemberResponse[] Members = members;
    }
}