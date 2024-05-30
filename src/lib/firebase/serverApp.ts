// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { initializeServerApp } from "firebase/app";
import { headers } from "next/headers";

import { getAuth } from "firebase/auth";
import { cache } from "react";
import { firebaseConfig } from "./config";

export const getBearerToken = () =>
  headers().get("Authorization")?.split("Bearer ")[1] || "";

// cached version of getAuthenticatedAppForUser, requires a
// idToken parameter to cache (I assume).
export const cachedGetAuthenticatedAppForUser = cache(async (idToken: string) =>
  getAuthenticatedAppForUser(idToken),
);

// we can optionally pass in an idToken to authenticate the user
// so we can use react cache
export async function getAuthenticatedAppForUser(idToken?: string) {
  if (idToken === undefined) {
    idToken = getBearerToken();
  }

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {},
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}
