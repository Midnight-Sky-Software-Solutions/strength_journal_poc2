import { useEffect } from "react";
import type { Route } from "./+types/home";
import { Button } from "primereact/button";
import sjclient from "lib/clients/sj-client";
import { useAuth0 } from "@auth0/auth0-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const { loginWithRedirect, isAuthenticated, isLoading  } = useAuth0();

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
  }

  useEffect(() => {
  }, [])

  return (
    <div className="p-5">
      <Button>Test</Button>
    </div>
  );
}
