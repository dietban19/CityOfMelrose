using backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddHttpClient<WordPressService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(30);
});

var frontendUrl =
    builder.Configuration["FrontendUrl"]
    ?? "http://localhost:4200";

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(frontendUrl)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("Frontend");

app.MapControllers();

app.MapGet("/", () => new
{
    application = "City of Melrose API",
    status = "running"
});

app.Run();