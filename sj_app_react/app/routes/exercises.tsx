import type { components } from "lib/clients/sj-client.d";
import sjclient, { useQuery } from "lib/clients/sj-client";
import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Exercises() {
  const { data: exercises, error, isLoading } = useQuery("/api/Exercises");

  if (error) throw error;

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <div className="flex">
            <h2 className="text-2xl font-bold">Exercises</h2>
            <div className="grow"></div>
            <Link to='/exercises/create'><Button label="New" size="small" outlined /></Link>
          </div>
          <div className="flex flex-col gap-6 pt-5">
            {isLoading && (
              <ProgressSpinner />
            )}
            {!isLoading && exercises!.map(exercise => (
              <div key={exercise.id} className="flex gap-5 items-center">
                <div className="w-6"><HeartIcon /></div>
                <div className="text-lg"><Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}