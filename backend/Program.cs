using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add controller-based API support.
builder.Services.AddControllers();

// Register WordPressService and provide its HttpClient.
builder.Services.AddHttpClient<WordPressService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(15);
});

// Allow requests from the Angular development server.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDevelopment", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Enable the Angular CORS policy.
app.UseCors("AngularDevelopment");

// Map all controller endpoints.
app.MapControllers();

app.Run();