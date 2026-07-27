namespace backend.Models;

public sealed class HomePage
{
    public int Id { get; init; }

    public string Slug { get; init; } = string.Empty;

    public string Title { get; init; } = string.Empty;

    public string Content { get; init; } = string.Empty;

    public string HeroTitle { get; init; } = string.Empty;

    public string HeroDescription { get; init; } = string.Empty;

    public string? HeroImageUrl { get; init; }

    public string HeroImageAlt { get; init; } = string.Empty;

    public string? HeroButtonText { get; init; }

    public string? HeroButtonUrl { get; init; }
}