import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("exercises", "routes/exercises.tsx"),
  route("exercises/create", "routes/exercise-create.tsx"),
  route("exercises/:id", "routes/exercise-view.tsx"),
  route("exercises/:id/edit", "routes/exercise-edit.tsx"),
  route("workouts/create", "routes/workout-create.tsx"),
  route("workouts/:id/edit", "routes/workout-edit.tsx"),
  route("workouts", "routes/workouts.tsx"),

  ...prefix("onboard", [
    index("routes/auth/onboard.tsx")
  ])
] satisfies RouteConfig;
