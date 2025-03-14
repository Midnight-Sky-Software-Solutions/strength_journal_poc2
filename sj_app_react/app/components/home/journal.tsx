import { PencilSquareIcon } from "@heroicons/react/16/solid";
import sjclient from "lib/clients/sj-client";
import type { components } from "lib/clients/sj-client.d";
import { dateFormat1 } from "lib/utils";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Journal() {
  const perPage = 5;
  const [working, setWorking] = useState(false);
  const [noMorePages, setNoMorePages] = useState(false);
  const [ workouts, setWorkouts ] = useState([] as components["schemas"]["GetWorkoutsResponse"][]);
  const [ page, setPage ] = useState(0);
  useEffect(() => {
    setWorking(true);
    sjclient.GET('/api/Workouts', {
      params: {
        query: {
          page: page,
          perPage: perPage
        }
      }
    })
    .then(res => {
      if (res.response.ok) {
        if (res.data!.length == 0) {
          setNoMorePages(true);
        }
        setWorkouts(workouts.concat(res.data!));
      }
      setWorking(false);
    });
  }, [page]);
  return (
    <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
      <h2 className="text-2xl font-bold">Journal</h2>
      <div className="flex flex-col gap-6 pt-5">
        {workouts.map(workout => (
          <div key={workout.id} className="flex gap-5 items-center">
            <div className="w-6"><PencilSquareIcon /></div>
            <div className="text-lg">
              <Link to={`/workouts/${workout.id}/edit`}>
                {dateFormat1(workout.entryDateUTC!)}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-5 flex justify-center">
        <Button 
          outlined 
          label="Load More" 
          size="small" 
          loading={working} 
          onClick={() => setPage(page+1)}
          disabled={noMorePages}
        />
      </div>
    </div>
  );
}