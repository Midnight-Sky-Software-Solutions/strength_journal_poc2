namespace StrengthJournal.API.Model
{
    public class GuidResponse
    {
        public GuidResponse(Guid id)
        {
            this.Result = id;
        }
        public Guid Result { get; set; }
    }
}
