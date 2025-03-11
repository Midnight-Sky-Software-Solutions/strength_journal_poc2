using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace StrengthJournal.API.Model.Exercises
{
    public class CreateExerciseRequest
    {
        [Required]
        [StringLength(maximumLength: 255)]
        public string Name { get; set; }
        public string ParentExerciseIdString { get; set; }
        [ReadOnly(true)]
        public Guid? ParentExerciseId { get => (ParentExerciseIdString == "0") ? null : Guid.Parse(ParentExerciseIdString); }
    }
}
