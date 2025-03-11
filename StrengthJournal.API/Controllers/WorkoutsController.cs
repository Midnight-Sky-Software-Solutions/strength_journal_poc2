using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrengthJournal.API.Model;
using StrengthJournal.API.Model.Workouts;

namespace StrengthJournal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkoutsController : ControllerBase
    {
        [HttpPost]
        public async Task<GuidResponse> CreateWorkout(CreateWorkoutRequest request)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spCreateWorkout @UserId, @Date";
                var id = await db.ExecuteScalarAsync<Guid>(sql, new
                {
                    UserID = userId,
                    Date = request.EntryDateUTC,
                });
                return new GuidResponse(id);
            }
        }

        [HttpGet]
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
