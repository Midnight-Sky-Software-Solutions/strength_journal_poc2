import { Auth0Client } from '@auth0/auth0-spa-js';

export const auth0 = new Auth0Client({
  domain: "dev-bs65rtlog25jigd0.us.auth0.com",
  clientId: "byMfHvaRsuKC1IGM9SLQtrIaAvS7wL5v",
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    audience: 'https://localhost:7080/api',
    scope: "read:current_user",
  }
});
