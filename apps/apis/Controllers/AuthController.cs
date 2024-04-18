
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;

namespace apis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpGet("login-with-google")]
        public async Task<ActionResult> LoginWithGoogle(string token)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = ["325523474062-qbr946eu7a4mmoq0dmo4h80uf4bf01db.apps.googleusercontent.com"]
            };
            var result = await GoogleJsonWebSignature.ValidateAsync(token, settings);

            if (result is null) return BadRequest();

            var test = result;

            Console.WriteLine(test);

            return Ok();
        }
    }
}