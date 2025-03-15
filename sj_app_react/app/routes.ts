import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("exercises", "routes/exercises.tsx"),
  route("exercises/create", "routes/exercise-create.tsx"),
  route("exercises/:id", "routes/exercise-view.tsx"),
  route("exercises/:id/edit", "routes/exercise-edit.tsx"),
  route("workouts/create", "routes/workout-create.tsx"),
  route("workouts/:id/edit", "routes/workout-edit.tsx"),
] satisfies RouteConfig;
