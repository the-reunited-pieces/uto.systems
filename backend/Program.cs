using System.Text.Json;
using backend;
using backend.types;
using MongoDB.Driver;

const string CORS_ALLOW_ALL = "_allow_all";

var client = new MongoClient(Configuration.GetEnvVar("MONGODB_URI"));
var database = client.GetDatabase(Configuration.GetEnvVar("MONGODB_DATABASE"));
var users = database.GetCollection<User>("users");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CORS_ALLOW_ALL, policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors(CORS_ALLOW_ALL);

app.MapGet("/sysinfo", async (HttpRequest req) =>
{
    var cursor = await users.FindAsync(Builders<User>.Filter.Eq(u => u.UserId, Configuration.GetEnvVar("UTO_ID")));
    var doc = await cursor.FirstAsync();

    if (doc == null || doc.Members == null) return Results.Accepted("[]");

    req.Headers.ContentType = "application/json";

    return Results.Ok(
        new SysinfoResponse(
            doc.Fronters ?? [],
            [.. doc.Members
                .Where(member => member.IsBlurry != true)
                .Select(member => new MemberResponse(
                    member.Id,
                    member.GlobalConfiguration?.DisplayName ?? member.Name,
                    member.GlobalConfiguration?.Description
                ))]
        )
    );
});

app.Run();