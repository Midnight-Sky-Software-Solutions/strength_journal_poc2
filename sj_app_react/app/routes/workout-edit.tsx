import sjclient from "lib/clients/sj-client";
import type { Route } from "./+types/exercise-edit";
import { dateFormat1 } from "lib/utils";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await sjclient.GET("/api/Workouts/{workoutid}", {
    params: {
      path: {
        workoutid: params.id
      }
    }
  });
  return res.data!;
}

export default function EditWorkout({
  loaderData: workout
}: Route.ComponentProps) {
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <div className="flex">
            <h2 className="text-2xl font-bold">{dateFormat1(workout.entryDateUTC)}</h2>
            <div className="grow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}