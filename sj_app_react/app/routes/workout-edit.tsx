import sjclient from "lib/clients/sj-client";
import type { Route } from "./+types/workout-edit";
import { dateFormat1 } from "lib/utils";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


const Set = z.object({
  id: z.string(),
  exerciseId: z.string(),
  reps: z.coerce.number(),
  weight: z.coerce.number().positive(),
  rpe: z.string().transform(value => value == '' ? null : value).nullable().transform((value) => value == null ? null : Number(value))
})

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const getWorkout = sjclient.GET("/api/Workouts/{workoutid}", {
    params: {
      path: {
        workoutid: params.id
      }
    }
  });
  const getExercises = sjclient.GET('/api/Exercises');
  const [workoutRes, exercisesRes] = await Promise.all([getWorkout, getExercises]);
  return {
    workout: workoutRes.data!, exercises: exercisesRes.data!.map(e => ({ label: e.name, value: e.id }))
  };
}

export default function EditWorkout({
  loaderData
}: Route.ComponentProps) {
  const { workout, exercises } = loaderData;
  const [sets, setSets] = useState(workout.sets);
  const [exerciseId, setExerciseId] = useState(null as string | null);
  const [weight, setWeight] = useState(null as number | null);
  const [reps, setReps] = useState(null as number | null);
  const [rpe, setRpe] = useState(null as number | null);
  const [errors, setErrors] = useState({} as { [field: string]: string[] });
  const [working, setWorking] = useState(false);
  const [id, setId] = useState(uuidv4())

  function addSet(formData: FormData) {
    setWorking(true);
    formData.set('rpe', formData.get('rpe') ? (Number(formData.get('rpe')) * 2).toString() : '')
    const data = Object.fromEntries(formData);
    data.id = id;
    const body = Set.parse(data);
    sjclient.POST("/api/Workouts/{workoutid}/sets", {
      params: {
        path: {
          workoutid: workout.id!
        },
      },
      body: body
    }).then((res) => {
      if (res.response.ok) {
        setSets([...sets!, { ...data, exerciseName: exercises.find(e => e.value === data.exerciseId)?.label }]);
      } else {
        setErrors(res.error!);
      }
      setWorking(false);
    });
    setId(uuidv4());
  }

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl px-2 py-1 gap-5 sm:grid grid-cols-1 sm:grid-cols-2">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <div className="flex">
            <h2 className="text-2xl font-bold">{dateFormat1(workout.entryDateUTC!)}</h2>
          </div>
          <form
            action={addSet}
            className="grow flex flex-col gap-8 mt-10"
          >
            <FloatLabel>
              <div className="text-red-500">
                {!!errors['ExerciseId'] ? <small>{errors['ExerciseId'][0]}</small> : <></>}
              </div>
              <Dropdown
                invalid={!!errors['ParentExerciseIdString']}
                id="exerciseId"
                name="exerciseId"
                value={exerciseId}
                onChange={(e) => setExerciseId(e.target.value)}
                options={exercises}
                className="w-60"
              />
              <label htmlFor="name">Exercise</label>
            </FloatLabel>
            <FloatLabel>
              <div className="text-red-500">
                {!!errors['Weight'] ? <small>{errors['Weight'][0]}</small> : <></>}
              </div>
              <InputNumber
                invalid={!!errors['Weight']}
                id="name"
                className="grow max-w"
                value={weight}
                name="weight"
                min={0}
                onChange={(e) => setWeight(e.value)}
              />
              <label htmlFor="name">Weight</label>
            </FloatLabel>
            <FloatLabel>
              <div className="text-red-500">
                {!!errors['Reps'] ? <small>{errors['Reps'][0]}</small> : <></>}
              </div>
              <InputNumber
                invalid={!!errors['Reps']}
                id="name"
                className="grow max-w"
                value={reps}
                name="reps"
                min={0}
                onChange={(e) => setReps(e.value)}
              />
              <label htmlFor="name">Reps</label>
            </FloatLabel>
            <FloatLabel>
              <div className="text-red-500">
                {!!errors['RPE'] ? <small>{errors['RPE'][0]}</small> : <></>}
              </div>
              <InputNumber
                invalid={!!errors['RPE']}
                id="name"
                className="grow max-w"
                value={rpe}
                name="rpe"
                min={1}
                max={10}
                onChange={(e) => setRpe(e.value)}
              />
              <label htmlFor="name">RPE</label>
            </FloatLabel>
            <div>
              <Button loading={working} label="Add Set" />
            </div>
          </form>
        </div>
        <div className="bg-white rounded-3xl py-5 px-5 mt-3 sm:mt-0 flex flex-col">
          <DataTable 
            value={sets!}
            selectionMode="single"
            reorderableRows 
          >
            <Column rowReorder style={{ width: '3rem' }} />
            <Column field="exerciseName" header="Exercise Name" />
            <Column field="reps" header="Reps" />
            <Column field="weight" header="Weight" />
            <Column field="rpe" header="RPE" />
          </DataTable>
        </div>
      </div>
    </div>
  );
}