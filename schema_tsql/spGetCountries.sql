CREATE OR ALTER PROCEDURE spGetCountries AS
BEGIN

SELECT 
    [Code],
    [Name]
FROM [StrengthJournalLocalDev].[dbo].[Countries]

END