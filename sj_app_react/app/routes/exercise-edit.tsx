import sjclient from "lib/clients/sj-client";
import type { Route } from "./+types/exercise-edit";
import { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const getExercise = sjclient.GET('/api/Exercises/{id}', {
    params: {
      path: {
        id: params.id
      }
    }
  })
  const getExercises = sjclient.GET('/api/Exercises');
  const [getExerciseResult, getExercisesResult] = await Promise.all([getExercise, getExercises]);
  return {
    exercise: getExerciseResult.data!,
    exercises: getExercisesResult.data!.map(e => ({ label: e.name, value: e.id }))
      .concat([{ label: '', value: '' }])
      .sort((e1, e2) => (e1.label! > e2.label! ? 1 : -1))
  };
}

export default function EditExercise({
  loaderData
}: Route.ComponentProps) {
  const { exercise, exercises } = loaderData;
  const [name, setName] = useState(exercise.name!);
  const [parentExerciseId, setParentExerciseId] = useState(exercise.parentExerciseId);
  const [errors, setErrors] = useState({} as { [field: string]: string[] });
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();

  function updateExercise(formData: FormData) {
    setWorking(true);
    const body = Object.fromEntries(formData);
    sjclient.PUT('/api/Exercises', {
      body: body as any
    })
    .then(res => {
      if (res.response.ok) {
        navigate(`/exercises/${exercise.id}`)
      } else {
        if (res.response.status == 400) {
          setErrors((res.error! as any).errors);
          setWorking(false);
        }
      }
    });
  }

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <div>
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <form
              action={updateExercise}
              className="grow flex flex-col gap-5 mt-10"
            >
              <input value={exercise.id} id='id' name='id' hidden readOnly />
              <FloatLabel>
                <div className="text-red-500">
                  {!!errors['Name'] ? <small>{errors['Name'][0]}</small> : <></>}
                </div>
                <InputText
                  invalid={!!errors['Name']}
                  id="name"
                  className="grow max-w"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Name</label>
              </FloatLabel>
              <div className="text-red-500">
                {!!errors['ParentExerciseIdString'] ? <small>{errors['ParentExerciseIdString'][0]}</small> : <></>}
              </div>
              <FloatLabel>
                <Dropdown
                  invalid={!!errors['ParentExerciseIdString']}
                  id="parentExerciseIdString"
                  name="parentExerciseIdString"
                  value={parentExerciseId}
                  onChange={(e) => setParentExerciseId(e.target.value)}
                  options={exercises}
                  className="w-60"
                />
                <label htmlFor="parentExerciseIdString">Parent Exercise</label>
              </FloatLabel>
              <div className="flex gap-3">
                <div>
                  <Button loading={working} label="Save" />
                </div>
                {/* <div className="grow">
                  <Button disabled={working} onClick={deleteExercise}>Delete</Button>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}