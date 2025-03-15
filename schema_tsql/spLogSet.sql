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

MERGE
    dbo.WorkoutLogEntrySets tgt
USING (
    SELECT 
        @Id,
        @WorkoutLogEntryId,
        @ExerciseId,
        @Reps,
        @Weight,
        @RPE,
        (SELECT MAX(Sequence) FROM WorkoutLogEntrySets WHERE WorkoutLogEntryId = @WorkoutLogEntryId) + 1)
    AS src(Id, WorkoutLogEntryId, ExerciseId, Reps, Weight, RPE, Sequence)
    ON (src.Id = tgt.Id)
WHEN MATCHED
    THEN
        UPDATE
            SET 
                Reps = src.Reps,
                Weight = src.Weight,
                RPE = src.RPE
WHEN NOT MATCHED
    THEN INSERT (
        Id,
        WorkoutLogEntryId,
        ExerciseId,
        Reps,
        Weight,
        RPE,
        Sequence
    )
    VALUES (
        src.Id,
        src.WorkoutLogEntryId,
        src.ExerciseId,
        src.Reps,
        src.Weight,
        src.RPE,
        src.Sequence
    );
            

END