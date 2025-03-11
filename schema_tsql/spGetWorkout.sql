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


END