namespace StrengthJournal.API.Model.Exercises
{
    public class GetExerciseResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsSystem { get; set; }
        public string ParentExerciseName { get; set; }
        public Guid ParentExerciseId { get; set; }
    }
}
