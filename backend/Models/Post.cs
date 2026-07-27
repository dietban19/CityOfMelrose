namespace backend.Models;

public sealed class Post : PostSummary
{
    public DateTime UpdatedAt { get; init; }

    public string Content { get; init; } = string.Empty;

    public string Author { get; init; } = string.Empty;
}