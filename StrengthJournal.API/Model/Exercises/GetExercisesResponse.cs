namespace StrengthJournal.API.Model.Exercises
{
    public class GetExercisesResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsSystem { get; set; }
        public Guid? ParentExerciseId { get; set; }
    }
}
