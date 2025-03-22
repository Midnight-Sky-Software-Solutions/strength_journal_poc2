namespace StrengthJournal.API.Model.Users
{
    public class OnboardUserRequest
    {
        public string UserCountryCode {  get; set; }
        public Guid PreferredWeightUnitId { get; set; }
    }
}
