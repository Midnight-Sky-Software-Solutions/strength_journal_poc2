CREATE OR ALTER PROCEDURE spGetCountries AS
BEGIN

SELECT 
    [Code],
    [Name]
FROM [dbo].[Countries]

END