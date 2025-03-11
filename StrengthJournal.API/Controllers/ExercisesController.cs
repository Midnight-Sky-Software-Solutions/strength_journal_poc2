using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrengthJournal.API.Model.Exercises;

namespace StrengthJournal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<GetExercisesResponse>> GetExercises()
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spGetExercisesForUser @UserID";
                var exercises = await db.QueryAsync<GetExercisesResponse>(sql, new
                {
                    UserID = userId
                });
                return exercises;
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<GetExerciseResponse>> GetExercise(Guid id)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spGetExercise @UserId, @ExerciseId";
                var exercise = await db.QuerySingleOrDefaultAsync<GetExerciseResponse>(sql, new
                {
                    UserID = userId,
                    ExerciseID = id
                });
                if (exercise == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(exercise);
                }
            }
        }
    }
}
