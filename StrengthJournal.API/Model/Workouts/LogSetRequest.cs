﻿namespace StrengthJournal.API.Model.Workouts
{
    public class LogSetRequest
    {
        public Guid Id { get; set; }
        public Guid ExerciseId { get; set; }
        public int Reps { get; set; }
        public decimal Weight { get; set; }
        public int? RPE { get; set; }
    }
}
