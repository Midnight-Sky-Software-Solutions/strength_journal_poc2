﻿namespace StrengthJournal.API.Model.Workouts
{
    public class GetWorkoutResponse
    {
        public Guid Id { get; set; }
        public DateTime EntryDateUTC { get; set; }
        public IEnumerable<SetData> Sets { get; set; }
    }
}
