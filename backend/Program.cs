using System.Net;
using System.Net.Http.Headers;
using backend;
using backend.types;
using MongoDB.Bson;
using MongoDB.Driver;

const string CORS_ALLOW_ALL = "_allow_all";

var httpClient_GitHub = new HttpClient();
httpClient_GitHub.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Configuration.GetEnvVar("GITHUB_TOKEN"));
httpClient_GitHub.DefaultRequestHeaders.UserAgent.ParseAdd("uto.systems");

var httpClient_PK = new HttpClient();
httpClient_PK.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", Configuration.GetEnvVar("PK_TOKEN"));
httpClient_PK.DefaultRequestHeaders.UserAgent.ParseAdd("uto.systems");

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
    SysInfo systemInfo = new(null, null);

    var members_response = await httpClient_PK.GetAsync("https://api.pluralkit.me/v2/systems/@me/members");
    var fronters_response = await httpClient_PK.GetAsync("https://api.pluralkit.me/v2/systems/@me/fronters");
    
    req.Headers.ContentType = "application/json";
    var Fronters = await fronters_response.Content.ReadFromJsonAsync<Switch>();

    systemInfo.Members = await members_response.Content.ReadFromJsonAsync<Member[]>();
    systemInfo.Fronters = Fronters?.members.Select(member => member.Id).ToArray();

    return Results.Ok(systemInfo);
});

app.MapGet("/github-contributions-weeks", async () =>
{
    var response = await httpClient_GitHub.PostAsJsonAsync("https://api.github.com/graphql", new
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
    var response = await httpClient_GitHub.GetFromJsonAsync<GithubEvent[]>($"https://api.github.com/users/{Configuration.GetEnvVar("GITHUB_USERNAME")}/events/public");
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