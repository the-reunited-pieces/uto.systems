using MongoDB.Bson.Serialization.Attributes;

namespace backend.types
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonElement("id")]
        public string? UserId;
        [BsonElement("members")]
        public Member[]? Members;
        [BsonElement("fronters")]
        public string[]? Fronters;
    }
}