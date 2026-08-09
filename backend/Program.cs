const string CORS_ALLOW_ALL = "_allow_all";

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

app.MapGet("/", () =>
{
    return Results.Ok("Hello, World!");
});

app.Run();