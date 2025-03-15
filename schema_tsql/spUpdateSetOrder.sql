CREATE TYPE tvpSetSequence AS TABLE (
    [Id] UNIQUEIDENTIFIER,
    [Sequence] SMALLINT
);
GO;

CREATE OR ALTER PROCEDURE spUpdateSetOrder (
    @UserId UNIQUEIDENTIFIER,
    @WorkoutLogEntryId UNIQUEIDENTIFIER,
    @SetOrder tvpSetSequence READONLY
)
AS
BEGIN

SET NOCOUNT ON;

IF NOT EXISTS (
    SELECT 1
    FROM
        dbo.WorkoutLogEntries wle
    WHERE
        wle.UserId = @UserId
        AND wle.Id = @WorkoutLogEntryId
)
THROW 51000, 'Authentication failure', 1;

UPDATE
    s
SET
    s.Sequence = so.Sequence
FROM
    dbo.WorkoutLogEntrySets s
    INNER JOIN @SetOrder so ON so.Id = s.Id AND s.WorkoutLogEntryId = @WorkoutLogEntryId

END