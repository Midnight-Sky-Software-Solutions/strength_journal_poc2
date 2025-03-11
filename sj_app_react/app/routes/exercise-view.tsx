import sjclient from "lib/clients/sj-client";
import type { Route } from "./+types/exercise-view";
import { Button } from "primereact/button";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const result = await sjclient.GET('/api/Exercises/{id}', {
    params: {
      path: {
        id: params.id
      }
    }
  })
  return result.data!;
}

export default function ViewExercise({
  loaderData: exercise
}: Route.ComponentProps) {
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <div className="flex">
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <div className="grow"></div>
            <Button label="Edit" size="small" />
          </div>
          {exercise.parentExerciseId && (
            <span className="text-sm text-gray-500">{exercise.parentExerciseName} variation</span>
          )}
          <div className="flex flex-col items-center py-5">
            <div id="1rm" className="text-4xl font-medium">500 lbs</div>
            <div>1 RM</div>
          </div>
        </div>
      </div>
    </div>
  );
}