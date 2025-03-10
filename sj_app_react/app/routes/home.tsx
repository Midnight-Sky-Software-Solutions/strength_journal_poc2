import { useEffect } from "react";
import type { Route } from "./+types/home";
import { Button } from "primereact/button";
import sjclient, { tokenAuthParams } from "lib/clients/sj-client";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";
import { Card } from "primereact/card";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  return (
    <div className="w-full flex justify-center">
      <div className="bclass-name grow max-w-6xl flex flex-col px-2 py-1">
        <span className="text-xl py-5">Welcome back, Alex</span>
        <div className="bg-gray-500 h-80 rounded-3xl py-5 px-5 flex flex-col">
          <span className="text-white text-4xl font-bold">2025-03-09</span>
          <div className="grow flex items-center justify-center text-xl italic text-white">
            An inspirational quote would go here...
          </div>
          <div>
            <Button>Start Logging</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
