import sjclient from "lib/clients/sj-client";
import type { Route } from "./+types/workout-edit";
import { dateFormat1 } from "lib/utils";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { z, ZodType, type ZodStringDef } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { DataTable, type DataTableRowDataArray } from "primereact/datatable";
import { Column } from "primereact/column";


const Set = z.object({
  id: z.string().length(36),
  exerciseId: z.string().length(36, "An exercise must be specified"),
  reps: z.coerce.number().gte(0),
  weight: z.coerce.number().gte(0),
  rpe: z.string().transform(value => !!value ? Number(value) : null)
})

type SetType = z.infer<typeof Set>;

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
  const [exerciseId, setExerciseId] = useState(undefined as string | undefined);
  const [weight, setWeight] = useState(undefined as number | undefined);
  const [reps, setReps] = useState(undefined as number | undefined);
  const [rpe, setRpe] = useState(undefined as number | undefined);
  const [errors, setErrors] = useState({} as { [field: string]: string[] });
  const [working, setWorking] = useState(false);
  const [id, setId] = useState(uuidv4());
  const [selectedSet, setSelectedSet] = useState(undefined as SetType | undefined);

  function addSet(formData: FormData) {
    setWorking(true);
    formData.set('rpe', formData.get('rpe') ? (Number(formData.get('rpe')) * 2).toString() : '')
    const data = Object.fromEntries(formData);
    data.id = selectedSet?.id ?? id;
    const { data: body, error, success } = Set.safeParse(data);
    if (!success) {
      const e = error.errors.reduce((prev, current) => Object.assign(prev, {[current.path[0]]: [current.message]}), {});
      setErrors(e);
      setWorking(false);
      return;
    }
    sjclient.POST("/api/Workouts/{workoutid}/sets", {
      params: {
        path: {
          workoutid: workout.id!
        },
      },
      body: body
    }).then((res) => {
      if (res.response.ok) {
        if (!selectedSet) {
          setSets([...sets!, { ...data, exerciseName: exercises.find(e => e.value === data.exerciseId)?.label }]);
        } else {
          setSets(sets?.map(set => set.id === selectedSet.id ? { ...data, exerciseName: exercises.find(e => e.value === data.exerciseId)?.label } : set));
          setSelectedSet(undefined);
          selectionChanged(undefined);
        }
      } else {
        setErrors(res.error!);
      }
      setWorking(false);
    });
    setId(uuidv4());
  }

  function updateSetOrder(values: DataTableRowDataArray<{id?: string | undefined}[]>) {
    setWorking(true);
    const data = values.map((x, i) => ({ id: x.id, sequence: i }));
    sjclient.PUT("/api/Workouts/{workoutid}/sets/sequence", {
      params: {
        path: {
          workoutid: workout.id!
        },
      },
      body: data
    }).finally(() => setWorking(false));
  }

  function selectionChanged(value?: SetType) {
    setErrors({});
    setSelectedSet(value);
    setExerciseId(value?.exerciseId ?? undefined);
    setWeight(value?.weight ?? undefined);
    setReps(value?.reps ?? undefined);
    setRpe(value?.rpe ?? undefined);
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
                {!!errors['exerciseId'] ? <small>{errors['exerciseId'][0]}</small> : <></>}
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
                {!!errors['weight'] ? <small>{errors['weight'][0]}</small> : <></>}
              </div>
              <InputNumber
                invalid={!!errors['weight']}
                id="name"
                className="grow max-w"
                value={weight}
                name="weight"
                min={0}
                onChange={(e) => setWeight(e.value ?? undefined)}
              />
              <label htmlFor="name">Weight</label>
            </FloatLabel>
            <FloatLabel>
              <div className="text-red-500">
                {!!errors['reps'] ? <small>{errors['reps'][0]}</small> : <></>}
              </div>
              <InputNumber
                invalid={!!errors['reps']}
                id="name"
                className="grow max-w"
                value={reps}
                name="reps"
                min={0}
                onChange={(e) => setReps(e.value ?? undefined)}
              />
              <label htmlFor="name">Reps</label>
            </FloatLabel>
            <FloatLabel>
              <div className="text-red-500">
                {!!errors['rpe'] ? <small>{errors['rpe'][0]}</small> : <></>}
              </div>
              <InputNumber
                invalid={!!errors['rpe']}
                id="name"
                className="grow max-w"
                value={rpe}
                name="rpe"
                min={1}
                max={10}
                onChange={(e) => setRpe(e.value ?? undefined)}
              />
              <label htmlFor="name">RPE</label>
            </FloatLabel>
            <div className="flex gap-3">
              <Button loading={working} label={!!selectedSet ? 'Update Set' : 'Add Set'} />
              {!!selectedSet &&
                <Button outlined loading={working} label='Cancel'
                  onClick={e =>{ e.preventDefault(); setSelectedSet(undefined); selectionChanged(undefined); }}
              />
              }
              
            </div>
          </form>
        </div>
        <div className="bg-white rounded-3xl py-5 px-5 mt-3 sm:mt-0 flex flex-col">
          <DataTable 
            value={sets!}
            selectionMode="single"
            onSelectionChange={e => selectionChanged(e.value as SetType | undefined)}
            selection={selectedSet}
            dataKey="id"
            reorderableRows 
            onRowReorder={e => updateSetOrder(e.value)}
            disabled={working}
          >
            <Column rowReorder style={{ width: '3rem' }} />
            <Column field="exerciseName" header="Exercise Name" />
            <Column field="weight" header="Weight" />
            <Column field="reps" header="Reps" />
            <Column field="rpe" header="RPE" />
          </DataTable>
        </div>
      </div>
    </div>
  );
}