using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StrengthJournal.API.Model;
using StrengthJournal.API.Model.Exercises;

namespace StrengthJournal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExercisesController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<GuidResponse>> CreateExercise(CreateExerciseRequest request)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var id = await db.ExecuteScalarAsync<Guid>("EXEC spCreateExercise @UserId, @Name, @ParentExerciseID", new
                {
                    UserId = userId,
                    request.ParentExerciseId,
                    request.Name,
                });
                return Ok(new GuidResponse(id));
            }
        }

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

        [HttpPut]
        public async Task<ActionResult> UpdateExercise(UpdateExerciseRequest request)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spUpdateExercise @UserId, @ExerciseId, @Name, @ParentExerciseId";
                await db.ExecuteAsync(sql, new
                {
                    UserId = userId,
                    ExerciseId = request.Id,
                    Name = request.Name,
                    request.ParentExerciseId
                });
                return Ok();
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteExercise(Guid id)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spDeleteExercise @UserId, @ExerciseId";
                await db.ExecuteScalarAsync<Guid>(sql, new
                {
                    UserId = userId,
                    ExerciseId = id
                });
                return NoContent();
            }
        }
    }
}
