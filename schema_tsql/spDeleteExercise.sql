CREATE OR ALTER PROCEDURE spDeleteExercise (
    @UserId UNIQUEIDENTIFIER,
    @ExerciseId UNIQUEIDENTIFIER
)
AS

BEGIN

SET NOCOUNT ON;

DELETE FROM
    dbo.Exercises
OUTPUT
    DELETED.Id
WHERE
    (CreatedByUserId = @UserId)
    AND Id = @ExerciseId

END