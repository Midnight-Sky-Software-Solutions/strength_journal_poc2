CREATE OR ALTER PROCEDURE spOnboardUser (
    @UserId UNIQUEIDENTIFIER,
    @PreferredWeightUnitId UNIQUEIDENTIFIER,
    @UserCountryCode NVARCHAR(2)
)
AS
BEGIN

SET NOCOUNT ON;

INSERT INTO 
    dbo.Users(Id, ExternalId, ConsentCEM, Email, PreferredWeightUnitId, UserCountryCode)
VALUES (
    @UserId,
    @UserId,
    0,
    '',
    @PreferredWeightUnitId,
    @UserCountryCode
);

END