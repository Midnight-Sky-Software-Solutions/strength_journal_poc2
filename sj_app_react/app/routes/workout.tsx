import { useAuth0 } from "@auth0/auth0-react";
import type { Route } from "./+types/workout"
import sjclient, { tokenAuthParams } from "lib/clients/sj-client";
import { auth0 } from "lib/clients/auth0-client";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = await auth0.getTokenSilently();
  const result = await sjclient.GET('/api/Workouts', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return result.data!;
}

export default async function Workout({
  loaderData
}: Route.ComponentProps) {
  console.log(loaderData);
  return (
    <div>
      Workouts works! {loaderData[0].id}
    </div>
  )
}