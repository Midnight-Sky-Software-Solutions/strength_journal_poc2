import type { Route } from "./+types/home";
import { Button } from "primereact/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="p-5">
      <Button>Test</Button>
    </div>
  );
}
