CREATE OR ALTER PROCEDURE spGetUser (
    @UserId UNIQUEIDENTIFIER
)
AS
BEGIN

SELECT
    [PreferredWeightUnitId],
    [UserCountryCode]
FROM 
    [StrengthJournalLocalDev].[dbo].[Users]
WHERE ID = @UserId;

END