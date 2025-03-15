import { dateFormat1 } from "lib/utils";
import type { Route } from "./+types/home";
import { Button } from "primereact/button";
import Journal from "~/components/home/journal";
import { Link } from "react-router";

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
        <div className="bg-[url(/weight-unsplash.jpg)] bg-center bg-cover h-80 rounded-3xl py-5 px-5 flex flex-col">
          <span className="text-white text-4xl font-bold">{dateFormat1(new Date().toLocaleDateString())}</span>
          <div className="grow flex items-center justify-center text-xl italic text-white">
            Train heavy, train hard.
          </div>
          <div>
            <Link to='/workouts/create'><Button>Start Logging</Button></Link>
          </div>
        </div>
        <Journal />
      </div>
    </div>
  );
}
