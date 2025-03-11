using System.ComponentModel.DataAnnotations;

namespace StrengthJournal.API.Model.Workouts
{
    public class CreateWorkoutRequest
    {
        [Required]
        public DateTime EntryDateUTC { get; set; }
        public int? Bodyweight { get; set; }
    }
}
