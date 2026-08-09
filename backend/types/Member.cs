using MongoDB.Bson.Serialization.Attributes;

namespace backend.types
{
    [BsonIgnoreExtraElements]
    public class Member
    {
        [BsonElement("id")]
        public string? Id;
        [BsonElement("name")]
        public string? Name;
        [BsonElement("isBlurry")]
        public bool? IsBlurry;
        [BsonElement("globalConfiguration")]
        public MemberConfiguration? GlobalConfiguration;
    }
}