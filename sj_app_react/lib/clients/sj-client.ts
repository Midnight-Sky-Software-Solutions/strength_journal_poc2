import createClient from "openapi-fetch";
import type { paths } from "./sj-client.d";

const sjclient = createClient<paths>({
});

export default sjclient;

export const tokenAuthParams = {
  authorizationParams: {
    audience: 'https://localhost:7080/api',
    scope: "read:current_user",
  }
};