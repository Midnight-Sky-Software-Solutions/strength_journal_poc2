import type { Route } from "./+types/home";
import Journal from "~/components/home/journal";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Workouts - Strength Journal" },
  ];
}

export default function Home() {

  return (
    <div className="w-full flex justify-center">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <span className="text-xl pt-3">Workouts</span>
        <Journal />
      </div>
    </div>
  );
}
