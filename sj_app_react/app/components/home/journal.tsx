import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { auth0 } from "lib/clients/auth0-client";
import sjclient from "lib/clients/sj-client";
import type { components } from "lib/clients/sj-client.d";
import { dateFormat1 } from "lib/utils";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function Journal() {
  const [working, setWorking] = useState(true);
  const [ workouts, setWorkouts ] = useState([] as components["schemas"]["GetWorkoutsResponse"][]);
  useEffect(() => {
    sjclient.GET('/api/Workouts')
      .then(res => {
        if (res.response.ok) {
          setWorkouts(res.data!);
        }
        setWorking(false);
      });
  }, []);
  return (
    <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
      <h2 className="text-2xl font-bold">Journal</h2>
      <div className="flex flex-col gap-6 pt-5">
        {workouts.map(workout => (
          <div className="flex gap-5 items-center">
            <div className="w-6"><PencilSquareIcon /></div>
            <div className="text-lg">{dateFormat1(workout.entryDateUTC!)}</div>
          </div>
        ))}
      </div>
      <div className="pt-5 flex justify-center">
        <Button outlined label="Load More" size="small" loading={working} />
      </div>
    </div>
  );
}