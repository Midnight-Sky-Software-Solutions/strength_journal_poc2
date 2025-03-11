import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("exercises", "routes/exercises.tsx"),
  route("workouts/:id", "routes/workout.tsx")
] satisfies RouteConfig;
