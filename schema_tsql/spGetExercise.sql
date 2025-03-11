CREATE OR ALTER PROCEDURE spGetExercise (
    @UserId UNIQUEIDENTIFIER,
    @ExerciseId UNIQUEIDENTIFIER
)
AS
SELECT
    e.ID,
    e.[Name],
    CASE
        WHEN e.CreatedByUserId IS NULL THEN 1
        ELSE 0
    END [IsSystem],
    p.[Name] [ParentExerciseName],
    e.ParentExerciseId
FROM
    dbo.Exercises e
    LEFT JOIN dbo.Exercises p ON p.Id = e.ParentExerciseId
WHERE
    (e.CreatedByUserId IS NULL
    OR e.CreatedByUserId = @UserId)
    AND e.Id = @ExerciseId