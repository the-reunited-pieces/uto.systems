using MongoDB.Bson.Serialization.Attributes;

namespace backend.types
{
    [BsonIgnoreExtraElements]
    public class MemberConfiguration
    {
        [BsonElement("displayName")]
        public string? DisplayName;
        [BsonElement("pronouns")]
        public string? Pronouns;
        [BsonElement("description")]
        public string? Description;
        [BsonElement("avatarURL")]
        public string? AvatarURL;
    }
}