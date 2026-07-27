namespace backend.Models;

public class PostSummary
{
    public int Id { get; init; }

    public string Slug { get; init; } = string.Empty;

    public string Title { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public DateTime PublishedAt { get; init; }

    public string? ImageUrl { get; init; }

    public string ImageAlt { get; init; } = string.Empty;

    public string Category { get; init; } = string.Empty;
}