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

        [HttpGet("{workoutid:guid}")]
        public async Task<ActionResult<GetWorkoutResponse>> GetWorkout([FromRoute] Guid workoutid)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spGetWorkout @UserId, @WorkoutId";
                var multiple = await db.QueryMultipleAsync(sql, new
                {
                    UserId = userId,
                    WorkoutID = workoutid
                });
                var workout = await multiple.ReadSingleOrDefaultAsync<GetWorkoutResponse>();
                if (workout == null)
                {
                    return NotFound();
                }
                workout.Sets = await multiple.ReadAsync<SetData>();
                return workout;
            }
        }

        [HttpPost("{workoutid:guid}/sets")]
        public async Task<ActionResult> LogSet([FromRoute] Guid workoutid, LogSetRequest request)
        {
            using (var db = DB.SqlConnection)
            {
                var userId = HttpContext.GetUserId();
                var sql = "EXEC spLogSet @UserId, @Id, @WorkoutLogEntryId, @ExerciseId, @Weight, @Reps, @RPE";
                await db.ExecuteAsync(sql, new
                {
                    UserId = userId,
                    Id = request.Id,
                    WorkoutLogEntryId = workoutid,
                    ExerciseId = request.ExerciseId,
                    Weight = request.Weight,
                    Reps = request.Reps,
                    RPE = request.RPE,
                });
                return Ok();
            }
        }
    }
}
