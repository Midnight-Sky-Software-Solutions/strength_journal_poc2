CREATE OR ALTER PROCEDURE spGetWorkouts (
    @UserId UNIQUEIDENTIFIER,
    @Page SMALLINT,
    @PerPage SMALLINT
)
AS
BEGIN

SET NOCOUNT ON;

SELECT
    Id,
    EntryDateUTC
FROM
    dbo.WorkoutLogEntries
WHERE
    UserId = @UserId
ORDER BY EntryDateUTC
OFFSET (@Page * @PerPage) ROWS FETCH NEXT @PerPage ROWS ONLY;


END