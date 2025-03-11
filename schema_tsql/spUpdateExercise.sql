CREATE OR ALTER PROCEDURE spUpdateExercise (
    @UserId UNIQUEIDENTIFIER,
    @ExerciseId UNIQUEIDENTIFIER,
    @Name VARCHAR(255),
    @ParentExerciseId UNIQUEIDENTIFIER
)
AS
UPDATE
    dbo.Exercises
SET
    [Name] = @Name,
    ParentExerciseId = @ParentExerciseId
WHERE
    (CreatedByUserId = @UserId)
    AND Id = @ExerciseId