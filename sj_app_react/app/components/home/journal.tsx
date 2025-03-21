import { PencilSquareIcon } from "@heroicons/react/16/solid";
import sjclient, { useInfinite } from "lib/clients/sj-client";
import type { components } from "lib/clients/sj-client.d";
import { dateFormat1 } from "lib/utils";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Journal() {
  const perPage = 5;
  const [noMoreResults, setNoMoreResults] = useState(false);
  const { data: workoutsList, error, isLoading, size, setSize } = useInfinite('/api/Workouts', (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.length === 0) {
      setNoMoreResults(true);
      return null;
    }

    return {
      params: {
        query: {
          page: pageIndex,
          perPage: perPage
        }
      }
    }
  });

  if (error) throw error;

  return (
    <div className="bg-white rounded-3xl py-5 px-5 flex flex-col">
      <h2 className="text-2xl font-bold">Journal</h2>
      <div className="flex flex-col gap-6 pt-5">
        {!isLoading && workoutsList!.map(workoutList => (
          workoutList.map(workout => (
            <div key={workout.id} className="flex gap-5 items-center">
              <div className="w-6"><PencilSquareIcon /></div>
              <div className="text-lg">
                <Link to={`/workouts/${workout.id}/edit`}>
                  {dateFormat1(workout.entryDateUTC!)}
                </Link>
              </div>
            </div>
          ))
        ))}
      </div>
      <div className="pt-5 flex justify-center">
        <Button
          outlined
          label="Load More"
          size="small"
          loading={isLoading}
          onClick={() => setSize(size + 1)}
          disabled={noMoreResults}
        />
      </div>
    </div>
  );
}