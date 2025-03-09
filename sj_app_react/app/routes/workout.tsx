import type { Route } from "./+types/workout"

export async function loader({ params }: Route.LoaderArgs) {

}

export default function Workout({
  loaderData
}: Route.ComponentProps) {
  return (
    <div>
      Workouts works!
    </div>
  )
}