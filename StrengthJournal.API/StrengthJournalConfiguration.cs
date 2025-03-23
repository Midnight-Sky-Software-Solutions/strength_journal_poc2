namespace StrengthJournal.API
{
    public static class StrengthJournalConfiguration
    {
        public static string SqlServerConnectionString => Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING") ?? "Server=localhost;Database=StrengthJournalLocalDev;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;";
    }
}
