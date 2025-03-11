CREATE OR ALTER PROCEDURE spDeleteExercise (
    @UserId UNIQUEIDENTIFIER,
    @ExerciseId UNIQUEIDENTIFIER
)
AS
DELETE FROM
    dbo.Exercises
OUTPUT
    DELETED.Id
WHERE
    (CreatedByUserId = @UserId)
    AND Id = @ExerciseId