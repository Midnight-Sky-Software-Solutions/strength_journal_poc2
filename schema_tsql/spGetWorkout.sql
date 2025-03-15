CREATE OR ALTER PROCEDURE spGetWorkout (
    @UserId UNIQUEIDENTIFIER,
    @WorkoutId UNIQUEIDENTIFIER
)
AS
BEGIN

SET NOCOUNT ON;

SELECT
    Id,
    EntryDateUTC
FROM
    dbo.WorkoutLogEntries
WHERE
    UserId = @UserId
    AND Id = @WorkoutId
ORDER BY EntryDateUTC;

SELECT
    s.Id,
    s.ExerciseId,
    e.Name [ExerciseName],
    s.Reps,
    s.Weight,
    s.RPE
FROM
    dbo.WorkoutLogEntrySets s
    INNER JOIN dbo.Exercises e ON s.ExerciseId = e.Id
WHERE
    WorkoutLogEntryId = @WorkoutId;


END