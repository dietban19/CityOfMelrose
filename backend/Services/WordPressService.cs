using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.RegularExpressions;
using backend.Models;

namespace backend.Services;

public sealed class WordPressService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WordPressService> _logger;
    private readonly string _wordpressApiUrl;

    public WordPressService(
        HttpClient httpClient,
        IConfiguration configuration,
        ILogger<WordPressService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;

        _wordpressApiUrl =
            configuration["WordPress:BaseUrl"]
            ?? throw new InvalidOperationException(
                "WordPress:BaseUrl is not configured."
            );

        var username = configuration["WordPress:Username"];
        var password = configuration["WordPress:Password"];

        if (
            !string.IsNullOrWhiteSpace(username) &&
            !string.IsNullOrWhiteSpace(password)
        )
        {
            var credentials = Convert.ToBase64String(
                Encoding.UTF8.GetBytes(
                    $"{username}:{password}"
                )
            );

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue(
                    "Basic",
                    credentials
                );
        }
    }

    /// <summary>
    /// Retrieves the newest published WordPress posts.
    /// Used by the homepage news section.
    /// </summary>
    public async Task<IReadOnlyList<PostSummary>> GetPostsAsync(
        CancellationToken cancellationToken = default)
    {
        try
        {
            var requestUrl =
                $"{_wordpressApiUrl}/posts" +
                "?_embed=true" +
                "&per_page=10" +
                "&order=desc" +
                "&orderby=date";

            var posts =
                await _httpClient.GetFromJsonAsync<List<WordPressPost>>(
                    requestUrl,
                    cancellationToken
                );

            if (posts is null)
            {
                return Array.Empty<PostSummary>();
            }

            return posts
                .Select(MapPostSummary)
                .ToList();
        }
        catch (HttpRequestException exception)
        {
            _logger.LogError(
                exception,
                "Failed to retrieve WordPress posts."
            );

            throw;
        }
        catch (NotSupportedException exception)
        {
            _logger.LogError(
                exception,
                "WordPress returned an unsupported response format."
            );

            throw;
        }
    }

    /// <summary>
    /// Retrieves one published WordPress post using its slug.
    /// </summary>
    public async Task<Post?> GetPostBySlugAsync(
        string slug,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var encodedSlug = Uri.EscapeDataString(slug);

            var requestUrl =
                $"{_wordpressApiUrl}/posts" +
                $"?slug={encodedSlug}" +
                "&_embed=true";

            var posts =
                await _httpClient.GetFromJsonAsync<List<WordPressPost>>(
                    requestUrl,
                    cancellationToken
                );

            var post = posts?.FirstOrDefault();

            return post is null
                ? null
                : MapPost(post);
        }
        catch (HttpRequestException exception)
        {
            _logger.LogError(
                exception,
                "Failed to retrieve WordPress post {Slug}.",
                slug
            );

            throw;
        }
        catch (NotSupportedException exception)
        {
            _logger.LogError(
                exception,
                "WordPress returned an unsupported response for post {Slug}.",
                slug
            );

            throw;
        }
    }

    /// <summary>
    /// Retrieves the WordPress page with the slug "home".
    /// </summary>
    public async Task<HomePage?> GetHomePageAsync(
        CancellationToken cancellationToken = default)
    {
        try
        {
            var requestUrl =
                $"{_wordpressApiUrl}/pages" +
                "?slug=home" +
                "&_embed=true";

            var pages =
                await _httpClient.GetFromJsonAsync<List<WordPressPage>>(
                    requestUrl,
                    cancellationToken
                );

            var page = pages?.FirstOrDefault();

            if (page is null)
            {
                return null;
            }

            WordPressMedia? heroMedia = null;

            if (page.Acf?.HeroImage is int heroImageId)
            {
                heroMedia = await GetWordPressMediaAsync(
                    heroImageId,
                    cancellationToken
                );
            }

            var embeddedImage =
                page.Embedded?
                    .FeaturedMedia?
                    .FirstOrDefault();

            var pageTitle =
                DecodeHtml(page.Title.Rendered);

            return new HomePage
            {
                Id = page.Id,
                Slug = page.Slug,
                Title = pageTitle,
                Content = page.Content.Rendered,

                HeroTitle =
                    string.IsNullOrWhiteSpace(
                        page.Acf?.HeroTitle
                    )
                        ? pageTitle
                        : DecodeHtml(
                            page.Acf.HeroTitle
                        ),

                HeroDescription =
                    DecodeHtml(
                        page.Acf?.HeroDescription
                        ?? string.Empty
                    ),

                HeroImageUrl =
                    heroMedia?.SourceUrl
                    ?? embeddedImage?.SourceUrl,

                HeroImageAlt =
                    heroMedia?.AltText
                    ?? embeddedImage?.AltText
                    ?? string.Empty,

                HeroButtonText =
                    string.IsNullOrWhiteSpace(
                        page.Acf?.HeroButtonText
                    )
                        ? null
                        : DecodeHtml(
                            page.Acf.HeroButtonText
                        ),

                HeroButtonUrl =
                    string.IsNullOrWhiteSpace(
                        page.Acf?.HeroButtonUrl
                    )
                        ? null
                        : page.Acf.HeroButtonUrl
            };
        }
        catch (HttpRequestException exception)
        {
            _logger.LogError(
                exception,
                "Failed to retrieve the WordPress home page."
            );

            throw;
        }
        catch (NotSupportedException exception)
        {
            _logger.LogError(
                exception,
                "WordPress returned an unsupported home page response."
            );

            throw;
        }
    }

    private static PostSummary MapPostSummary(
        WordPressPost post)
    {
        var featuredImage =
            post.Embedded?
                .FeaturedMedia?
                .FirstOrDefault();

        var category =
            post.Embedded?
                .Terms?
                .FirstOrDefault()?
                .FirstOrDefault()?
                .Name
            ?? "City news";

        return new PostSummary
        {
            Id = post.Id,
            Slug = post.Slug,
            Title = DecodeHtml(
                post.Title.Rendered
            ),
            Description = CleanExcerpt(
                post.Excerpt.Rendered
            ),
            PublishedAt = post.Date,
            ImageUrl = featuredImage?.SourceUrl,
            ImageAlt =
                featuredImage?.AltText
                ?? string.Empty,
            Category = DecodeHtml(category)
        };
    }

    private static Post MapPost(
        WordPressPost post)
    {
        var summary = MapPostSummary(post);

        return new Post
        {
            Id = summary.Id,
            Slug = summary.Slug,
            Title = summary.Title,
            Description = summary.Description,
            PublishedAt = summary.PublishedAt,
            ImageUrl = summary.ImageUrl,
            ImageAlt = summary.ImageAlt,
            Category = summary.Category,
            UpdatedAt = post.Modified,
            Content = post.Content.Rendered,
            Author = "City of Melrose"
        };
    }

    private async Task<WordPressMedia?>
        GetWordPressMediaAsync(
            int mediaId,
            CancellationToken cancellationToken)
    {
        try
        {
            return await _httpClient
                .GetFromJsonAsync<WordPressMedia>(
                    $"{_wordpressApiUrl}/media/{mediaId}",
                    cancellationToken
                );
        }
        catch (HttpRequestException exception)
        {
            _logger.LogWarning(
                exception,
                "Failed to retrieve WordPress media {MediaId}.",
                mediaId
            );

            return null;
        }
        catch (NotSupportedException exception)
        {
            _logger.LogWarning(
                exception,
                "WordPress returned an unsupported response for media {MediaId}.",
                mediaId
            );

            return null;
        }
    }

    private static string CleanExcerpt(
        string value)
    {
        var withoutTags = Regex.Replace(
            value,
            "<[^>]*>",
            " "
        );

        var withoutEllipsis = withoutTags
            .Replace(
                "[&hellip;]",
                string.Empty
            )
            .Replace(
                "[…]",
                string.Empty
            );

        var normalizedWhitespace = Regex.Replace(
            withoutEllipsis,
            @"\s+",
            " "
        );

        return DecodeHtml(
            normalizedWhitespace.Trim()
        );
    }

    private static string DecodeHtml(
        string value)
    {
        return WebUtility.HtmlDecode(value);
    }
}