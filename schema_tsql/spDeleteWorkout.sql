CREATE OR ALTER PROCEDURE spDeleteWorkout (
    @UserId UNIQUEIDENTIFIER,
    @WorkoutId UNIQUEIDENTIFIER
)
AS

BEGIN

SET NOCOUNT ON;

DELETE FROM dbo.WorkoutLogEntries
WHERE
    Id = @WorkoutId
    AND UserId = @UserId;

END