CREATE OR ALTER PROCEDURE spCreateExercise (
    @UserId UNIQUEIDENTIFIER,
    @Name VARCHAR(255),
    @ParentExerciseID UNIQUEIDENTIFIER
)
AS
BEGIN

SET NOCOUNT ON;

DECLARE @ExerciseId UNIQUEIDENTIFIER = NEWID();

INSERT INTO
    dbo.Exercises(Id, [Name], ParentExerciseID, CreatedByUserId)
VALUES
    (@ExerciseId, @Name, @ParentExerciseID, @UserId);

SELECT @ExerciseId;

END