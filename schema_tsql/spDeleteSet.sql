CREATE OR ALTER PROCEDURE spDeleteSet (
    @UserId UNIQUEIDENTIFIER,
    @WorkoutLogEntryId UNIQUEIDENTIFIER,
    @SetId UNIQUEIDENTIFIER
)
AS
BEGIN

SET NOCOUNT ON;

IF NOT EXISTS (
    SELECT 1
    FROM
        dbo.WorkoutLogEntries wle
        INNER JOIN dbo.WorkoutLogEntrySets wles ON wles.WorkoutLogEntryId = wle.Id
    WHERE
        wle.UserId = @UserId
        AND wle.Id = @WorkoutLogEntryId
        AND wles.ID = @SetId
)
THROW 51000, 'Authentication failure', 1;

DELETE FROM dbo.WorkoutLogEntrySets
WHERE Id = @SetId;


END