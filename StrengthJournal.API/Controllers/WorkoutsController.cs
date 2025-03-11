using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrengthJournal.API.Model.Workouts;

namespace StrengthJournal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<GetWorkoutsResponse>> GetWorkouts([FromQuery] int page, [FromQuery] int perPage)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spGetWorkouts @UserId, @Page, @PerPage";
                var workouts = await db.QueryAsync<GetWorkoutsResponse>(sql, new 
                { 
                    UserId = userId,
                    Page = page,
                    PerPage = perPage
                });
                return workouts;
            }
        }
    }
}
