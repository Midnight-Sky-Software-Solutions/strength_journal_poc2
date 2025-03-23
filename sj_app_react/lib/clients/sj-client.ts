import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./sj-client.d";
import { auth0 } from "./auth0-client";
import { createImmutableHook, createInfiniteHook, createMutateHook, createQueryHook } from "swr-openapi";

const sjclient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL
});

export default sjclient;

const sjMiddleware: Middleware = {
  
  async onRequest({ request }) {
    try {
      const token = await auth0.getTokenSilently();
      request.headers.set("Authorization", `Bearer ${token}`);
    } catch (e: any) {
      if (e.message == 'Login required') {
        await auth0.loginWithRedirect();
      } else {
        throw e;
      }
    }
    return request;
  }

}
 
sjclient.use(sjMiddleware);

const prefix = "sj-api";

export const useQuery = createQueryHook(sjclient, prefix);
export const useImmutable = createImmutableHook(sjclient, prefix);
export const useInfinite = createInfiniteHook(sjclient, prefix);
