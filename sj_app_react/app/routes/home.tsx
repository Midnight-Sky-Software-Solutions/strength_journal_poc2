import { useEffect } from "react";
import type { Route } from "./+types/home";
import { Button } from "primereact/button";
import sjclient, { tokenAuthParams } from "lib/clients/sj-client";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";
import { Card } from "primereact/card";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Strength Journal" },
    { name: "description", content: "Record your workouts!" },
  ];
}

export default function Home() {

  const workouts = [
    { date: new Date() },
    { date: new Date() },
    { date: new Date() },
    { date: new Date() },
    { date: new Date() },
  ]

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
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <h2 className="text-2xl font-bold">Journal</h2>
          <div className="flex flex-col gap-6 pt-5">
            {workouts.map(workout => (
              <div className="flex gap-5 items-center">
                <div className="w-6"><PencilSquareIcon /></div>
                <div className="text-lg">{workout.date.toDateString()}</div>
              </div>
            ))}
          </div>
          <div className="pt-5 flex justify-center">
            <Button outlined label="Load More" size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
