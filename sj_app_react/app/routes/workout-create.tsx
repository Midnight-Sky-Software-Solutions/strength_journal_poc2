import sjclient from "lib/clients/sj-client";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

const Workout = z.object({
  entryDateUTC: z.coerce.date(),
  bodyweight: z.coerce.number().nullable()
})

export default function CreateWorkout() {
  const [entryDateUTC, setEntryDateUTC] = useState(new Date());
  const [bodyweight, setBodyweight] = useState(undefined as number | undefined);
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();

  function createWorkout(formData: FormData) {
    setWorking(true);
    const body = Workout.parse(Object.fromEntries(formData));
    sjclient.POST("/api/Workouts", {
      body: body as any
    })
    .then((res) => {
      if (res.response.ok) {
        navigate('/workouts'); // TODO: navigate to workout
      }
    })
  }

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">New Workout</h2>
            <form
              className="grow flex flex-col gap-6 mt-10"
              action={createWorkout}
            >
              <FloatLabel>
                <Calendar 
                  value={entryDateUTC} 
                  onChange={e => setEntryDateUTC(e.value!)} 
                  name="entryDateUTC" 
                  showTime 
                  hourFormat="12"
                />
                <label htmlFor="entryDateUTC">Date and Time</label>
              </FloatLabel>
              <FloatLabel>
                <InputNumber 
                  value={bodyweight} 
                  onValueChange={e => setBodyweight(e.value!)} 
                  name="bodyweight" 
                  min={0} 
                />
                <label htmlFor="bodyweight">Body Weight</label>
              </FloatLabel>
              <div className="flex gap-3">
                <div>
                  <Button loading={working} label="Create" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}