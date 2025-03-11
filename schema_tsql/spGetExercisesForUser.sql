CREATE OR ALTER PROCEDURE spGetExercisesForUser (
    @UserId UNIQUEIDENTIFIER
)
AS
BEGIN

SET NOCOUNT ON;

SELECT
    Id,
    [Name],
    CASE
        WHEN CreatedByUserId IS NULL THEN 1
        ELSE 0
    END [IsSystem],
    ParentExerciseId
FROM
    dbo.Exercises
WHERE
    CreatedByUserId IS NULL
    OR CreatedByUserId = @UserId
ORDER BY [Name]

END