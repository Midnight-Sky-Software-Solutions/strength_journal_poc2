import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./sj-client.d";
import { auth0 } from "./auth0-client";

const sjclient = createClient<paths>({
});

export default sjclient;

const sjMiddleware: Middleware = {
  
  async onRequest({ request }) {
    try {
      const token = await auth0.getTokenSilently();
      request.headers.set("Authorization", `Bearer ${token}`);
    } catch (e: any) {
      if (e.message == 'Login required') {
        auth0.loginWithRedirect();
      } else {
        throw e;
      }
    }
    return request;
  }

}

sjclient.use(sjMiddleware);