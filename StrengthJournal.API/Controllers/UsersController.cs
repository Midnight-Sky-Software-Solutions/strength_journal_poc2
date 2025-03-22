using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrengthJournal.API.Model.Users;

namespace StrengthJournal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet("me")]
        public async Task<ActionResult<GetUserResponse>> GetUser()
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spGetUser @UserId";
                var result = await db.QuerySingleOrDefaultAsync<GetUserResponse>(sql, new
                {
                    UserId = userId,
                });
                if (result != null)
                {
                    return result;
                }
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult> OnboardUser(OnboardUserRequest request)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                await db.ExecuteAsync("spOnboardUser @UserId, @PreferredWeightUnitId, @UserCountryCode", new
                {
                    UserId = userId,
                    request.PreferredWeightUnitId,
                    request.UserCountryCode
                });
                return Created();
            }
        }
    }
}
