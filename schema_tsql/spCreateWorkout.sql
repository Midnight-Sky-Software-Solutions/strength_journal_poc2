CREATE OR ALTER PROCEDURE spCreateWorkout (
    @UserId UNIQUEIDENTIFIER,
    @Date DATE
)
AS
BEGIN

SET NOCOUNT ON;

INSERT INTO
    dbo.WorkoutLogEntries (ID, EntryDateUTC, UserId)
OUTPUT
    INSERTED.Id
VALUES
    (NEWID(), @Date, @UserId);

END