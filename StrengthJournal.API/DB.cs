using Microsoft.Data.SqlClient;

namespace StrengthJournal.API
{
    public static class DB
    {
        public static SqlConnection SqlConnection => new SqlConnection(StrengthJournalConfiguration.SqlServerConnectionString);
    }
}
