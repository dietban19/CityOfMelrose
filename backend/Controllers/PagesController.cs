using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/pages")]
public sealed class PagesController : ControllerBase
{
    private readonly WordPressService _wordPressService;

    public PagesController(
        WordPressService wordPressService)
    {
        _wordPressService = wordPressService;
    }

    /// <summary>
    /// GET /api/pages/home
    /// </summary>
    [HttpGet("home")]
    [ProducesResponseType(
        typeof(HomePage),
        StatusCodes.Status200OK
    )]
    [ProducesResponseType(
        StatusCodes.Status404NotFound
    )]
    [ProducesResponseType(
        StatusCodes.Status502BadGateway
    )]
    public async Task<ActionResult<HomePage>> GetHomePage(
        CancellationToken cancellationToken)
    {
        try
        {
            var page =
                await _wordPressService.GetHomePageAsync(
                    cancellationToken
                );

            if (page is null)
            {
                return NotFound(new
                {
                    message = "The WordPress home page was not found."
                });
            }

            return Ok(page);
        }
        catch (HttpRequestException)
        {
            return Problem(
                title: "WordPress could not be reached.",
                detail: "The home page is temporarily unavailable.",
                statusCode: StatusCodes.Status502BadGateway
            );
        }
    }
}