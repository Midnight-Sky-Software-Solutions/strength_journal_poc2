import sjclient from "lib/clients/sj-client";
import type { Route } from "./+types/exercise-view";

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
  loaderData
}: Route.ComponentProps) {
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <h2 className="text-2xl font-bold">{loaderData.name}</h2>
        </div>
      </div>
    </div>
  );
}