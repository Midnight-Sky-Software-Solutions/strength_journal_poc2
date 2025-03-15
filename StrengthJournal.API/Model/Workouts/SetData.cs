using Microsoft.Identity.Client;

namespace StrengthJournal.API.Model.Workouts
{
    public class SetData
    {
        public Guid Id { get; set; }
        public Guid ExerciseId { get; set; }
        public string ExerciseName { get; set; } 
        public int Reps { get; set; }
        public decimal Weight { get; set; }
        public int? RPE { get; set; }
    }
}
