using System.Net;
using System.Net.Http.Headers;
using backend;
using backend.types;
using MongoDB.Driver;

const string CORS_ALLOW_ALL = "_allow_all";

var client = new MongoClient(Configuration.GetEnvVar("MONGODB_URI"));
var database = client.GetDatabase(Configuration.GetEnvVar("MONGODB_DATABASE"));
var users = database.GetCollection<User>("users");

var httpClient = new HttpClient();

httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Configuration.GetEnvVar("GITHUB_TOKEN"));
httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("uto.systems");

string[] activityEventTypes = ["CreateEvent", "PushEvent"];

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
                .Select(member => new MemberResponse(
                    member.Id,
                    member.GlobalConfiguration?.DisplayName ?? member.Name,
                    member.GlobalConfiguration?.Description,
                    member.GlobalConfiguration?.AvatarURL
                ))]
        )
    );
});

app.MapGet("/github-contributions-weeks", async () =>
{
    var response = await httpClient.PostAsJsonAsync("https://api.github.com/graphql", new
    {
        query = """
            query($userName: String!) {
                user(login: $userName) {
                    contributionsCollection {
                        contributionCalendar {
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                }
            }
        """,
        variables = new { userName = Configuration.GetEnvVar("GITHUB_USERNAME") }
    });

    if (response.StatusCode != HttpStatusCode.OK) return Results.InternalServerError();

    var result = await response.Content.ReadFromJsonAsync<GithubResponse>();

    var weeks = result?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (weeks == null) return Results.InternalServerError();

    return Results.Ok(weeks);
});

app.MapGet("/github-recent-projects", async () =>
{
    var response = await httpClient.GetFromJsonAsync<GithubEvent[]>($"https://api.github.com/users/{Configuration.GetEnvVar("GITHUB_USERNAME")}/events/public");
    if (response == null) return Results.InternalServerError();

    return Results.Ok(response
        .Reverse()
        .Where(item => activityEventTypes.Contains(item.type))
        .Select(item => item.repo?.name)
        .Where(repo => repo != null)
        .Distinct()
        .Take(3)
        .ToArray()
    );
});

app.Run();