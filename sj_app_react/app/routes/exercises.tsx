import type { components } from "lib/clients/sj-client.d";
import sjclient from "lib/clients/sj-client";
import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

export default function Exercises() {
  const [exercises, setExercises] = useState([] as components["schemas"]["GetExercisesResponse"][]);
  useEffect(() => {
    sjclient.GET('/api/Exercises')
      .then(res => {
        if (res.response.ok) {
          setExercises(res.data!)
        }
      })
  }, []);
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1 gap-5">
        <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
          <h2 className="text-2xl font-bold">Exercises</h2>
          <div className="flex flex-col gap-6 pt-5">
            {exercises.map(exercise => (
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