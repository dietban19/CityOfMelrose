using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/posts")]
public sealed class PostsController : ControllerBase
{
    private readonly WordPressService _wordPressService;

    public PostsController(
        WordPressService wordPressService)
    {
        _wordPressService = wordPressService;
    }

    /// <summary>
    /// GET /api/posts
    /// </summary>
    [HttpGet]
    [ProducesResponseType(
        typeof(IReadOnlyList<PostSummary>),
        StatusCodes.Status200OK
    )]
    [ProducesResponseType(
        StatusCodes.Status502BadGateway
    )]
    public async Task<ActionResult<IReadOnlyList<PostSummary>>> GetPosts(
        CancellationToken cancellationToken)
    {
        try
        {
            Console.WriteLine("GEtting Posts");
            var posts =
                await _wordPressService.GetPostsAsync(
                    cancellationToken
                );

            return Ok(posts);
        }
        catch (HttpRequestException)
        {
            return Problem(
                title: "WordPress could not be reached.",
                detail: "The news service is temporarily unavailable.",
                statusCode: StatusCodes.Status502BadGateway
            );
        }
    }

    /// <summary>
    /// GET /api/posts/downtown-street-improvements
    /// </summary>
    [HttpGet("{slug}")]
    [ProducesResponseType(
        typeof(Post),
        StatusCodes.Status200OK
    )]
    [ProducesResponseType(
        StatusCodes.Status404NotFound
    )]
    [ProducesResponseType(
        StatusCodes.Status502BadGateway
    )]
    public async Task<ActionResult<Post>> GetPostBySlug(
        string slug,
        CancellationToken cancellationToken)
    {
        try
        {
            var post =
                await _wordPressService.GetPostBySlugAsync(
                    slug,
                    cancellationToken
                );

            if (post is null)
            {
                return NotFound(new
                {
                    message = $"The news article \"{slug}\" was not found."
                });
            }

            return Ok(post);
        }
        catch (HttpRequestException)
        {
            return Problem(
                title: "WordPress could not be reached.",
                detail: "The news article is temporarily unavailable.",
                statusCode: StatusCodes.Status502BadGateway
            );
        }
    }
}