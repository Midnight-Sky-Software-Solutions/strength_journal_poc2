import { useEffect } from "react";
import type { Route } from "./+types/home";
import { Button } from "primereact/button";
import sjclient, { tokenAuthParams } from "lib/clients/sj-client";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const { loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently  } = useAuth0();

  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
  }

  useEffect(() => {
    getAccessTokenSilently(tokenAuthParams)
      .then(token => {
        return sjclient.GET('/api/Workouts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      })
      .then(res => {
        console.log(res);
      })
  }, [])

  return (
    <div className="p-5">
      <Link to='/workouts/d44e8d25-6f16-416d-87ea-dcb5214bebb3'>
        <Button>Edit Workout</Button>
      </Link>
    </div>
  );
}
