using System.Text.Json.Serialization;

namespace backend.Models;

public sealed class WordPressRenderedText
{
    [JsonPropertyName("rendered")]
    public string Rendered { get; init; } = string.Empty;
}

public sealed class WordPressFeaturedMedia
{
    [JsonPropertyName("source_url")]
    public string SourceUrl { get; init; } = string.Empty;

    [JsonPropertyName("alt_text")]
    public string AltText { get; init; } = string.Empty;
}

public sealed class WordPressCategory
{
    [JsonPropertyName("id")]
    public int Id { get; init; }

    [JsonPropertyName("name")]
    public string Name { get; init; } = string.Empty;

    [JsonPropertyName("slug")]
    public string Slug { get; init; } = string.Empty;
}

public sealed class WordPressEmbedded
{
    [JsonPropertyName("wp:featuredmedia")]
    public List<WordPressFeaturedMedia>? FeaturedMedia { get; init; }

    [JsonPropertyName("wp:term")]
    public List<List<WordPressCategory>>? Terms { get; init; }
}

public sealed class WordPressPost
{
    [JsonPropertyName("id")]
    public int Id { get; init; }

    [JsonPropertyName("slug")]
    public string Slug { get; init; } = string.Empty;

    [JsonPropertyName("date")]
    public DateTime Date { get; init; }

    [JsonPropertyName("modified")]
    public DateTime Modified { get; init; }

    [JsonPropertyName("title")]
    public WordPressRenderedText Title { get; init; } = new();

    [JsonPropertyName("excerpt")]
    public WordPressRenderedText Excerpt { get; init; } = new();

    [JsonPropertyName("content")]
    public WordPressRenderedText Content { get; init; } = new();

    [JsonPropertyName("_embedded")]
    public WordPressEmbedded? Embedded { get; init; }
}

public sealed class WordPressAcf
{
    [JsonPropertyName("hero_title")]
    public string? HeroTitle { get; init; }

    [JsonPropertyName("hero_description")]
    public string? HeroDescription { get; init; }

    [JsonPropertyName("hero_image")]
    public int? HeroImage { get; init; }

    [JsonPropertyName("hero_button_text")]
    public string? HeroButtonText { get; init; }

    [JsonPropertyName("hero_button_url")]
    public string? HeroButtonUrl { get; init; }
}

public sealed class WordPressPage
{
    [JsonPropertyName("id")]
    public int Id { get; init; }

    [JsonPropertyName("slug")]
    public string Slug { get; init; } = string.Empty;

    [JsonPropertyName("title")]
    public WordPressRenderedText Title { get; init; } = new();

    [JsonPropertyName("content")]
    public WordPressRenderedText Content { get; init; } = new();

    [JsonPropertyName("acf")]
    public WordPressAcf? Acf { get; init; }

    [JsonPropertyName("_embedded")]
    public WordPressEmbedded? Embedded { get; init; }
}

public sealed class WordPressMedia
{
    [JsonPropertyName("id")]
    public int Id { get; init; }

    [JsonPropertyName("source_url")]
    public string SourceUrl { get; init; } = string.Empty;

    [JsonPropertyName("alt_text")]
    public string AltText { get; init; } = string.Empty;
}