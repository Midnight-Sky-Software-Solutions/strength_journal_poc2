using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrengthJournal.API.Model;

namespace StrengthJournal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<GetWorkoutsResponse>> GetWorkouts()
        {
            using (var db = DB.SqlConnection)
            {
                var userId = Guid.Parse("DF072196-0EBB-4E4D-B5C7-4E0C02BCE795");
                var sql = "EXEC spGetWorkouts @UserId";
                var workouts = await db.QueryAsync<GetWorkoutsResponse>(sql, new { UserId = userId });
                return workouts;
            }
        }
    }
}
