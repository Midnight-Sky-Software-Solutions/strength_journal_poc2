CREATE OR ALTER PROCEDURE spGetUser (
    @UserId UNIQUEIDENTIFIER
)
AS
BEGIN

SELECT
    [PreferredWeightUnitId],
    [UserCountryCode]
FROM 
    [dbo].[Users]
WHERE ID = @UserId;

END