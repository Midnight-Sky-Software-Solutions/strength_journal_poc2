import type { Route } from "./+types/home";
import { Button } from "primereact/button";
import Journal from "~/components/home/journal";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Strength Journal" },
    { name: "description", content: "Record your workouts!" },
  ];
}

export default function Home() {

  return (
    <div className="w-full flex justify-center">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <span className="text-xl pt-3">Welcome back, Alex</span>
        <div className="bg-gray-500 h-80 rounded-3xl py-5 px-5 flex flex-col">
          <span className="text-white text-4xl font-bold">2025-03-09</span>
          <div className="grow flex items-center justify-center text-xl italic text-white">
            An inspirational quote would go here...
          </div>
          <div>
            <Button>Start Logging</Button>
          </div>
        </div>
        <Journal />
      </div>
    </div>
  );
}
