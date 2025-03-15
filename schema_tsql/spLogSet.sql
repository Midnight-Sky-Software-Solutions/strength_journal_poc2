CREATE OR ALTER PROCEDURE spLogSet (
    @UserId UNIQUEIDENTIFIER,
    @Id UNIQUEIDENTIFIER,
    @WorkoutLogEntryId UNIQUEIDENTIFIER,
    @ExerciseId UNIQUEIDENTIFIER,
    @Weight DECIMAL,
    @Reps INT,
    @RPE INT
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

INSERT INTO
    dbo.WorkoutLogEntrySets (
        Id,
        WorkoutLogEntryId,
        ExerciseId,
        Reps,
        Weight,
        RPE,
        Sequence
    )
VALUES (
    @Id,
    @WorkoutLogEntryId,
    @ExerciseId,
    @Reps,
    @Weight,
    @RPE,
    (SELECT MAX(Sequence) FROM WorkoutLogEntrySets WHERE WorkoutLogEntryId = @WorkoutLogEntryId) + 1
)

END