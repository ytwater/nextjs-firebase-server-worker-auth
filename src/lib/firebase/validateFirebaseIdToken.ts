import { isFuture, isPast } from "date-fns";
import type { DecodedIdToken } from "firebase-admin/auth";
import * as jose from "jose";

/**
 *
 * Validate a firebase ID token in an edge safe environment.  It will
 * throw an error if the token is invalid.
 *
 * Based on: https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library
 *
 * @param token - The firebase ID token to validate
 *
 */

export const validateFirebaseIdToken = async (token: string) => {
  const jwtHeaders = jose.decodeProtectedHeader(token);
  const { alg, kid } = jwtHeaders;

  if (!kid) throw new Error("No kid in token");
  const { exp, iat, aud, iss, sub, auth_time } = jose.decodeJwt(token);

  if (!alg || alg !== "RS256") throw new Error("Invalid alg");
  if (!exp || isPast(new Date(exp * 1000))) throw new Error("Token expired");
  if (!iat || isFuture(new Date(iat * 1000))) throw new Error("Invalid iat");
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
    throw new Error("No project id");
  if (!aud || aud !== process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
    throw new Error("Invalid aud");
  if (
    !iss ||
    iss !==
      `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`
  )
    throw new Error("Invalid iss");
  if (!sub) throw new Error("Invalid sub");
  if (!auth_time || !isPast(new Date((auth_time as number) * 1000)))
    throw new Error("Invalid auth_time");

  // Get Public Keys
  const timer = new Date().getTime();
  const publicKeys = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
  ).then(async (res) => res.json());
  console.log(`getting public keys in ${new Date().getTime() - timer}ms`);

  const publicKeyString = publicKeys[kid];
  if (!publicKeyString) throw new Error("Invalid kid");

  const cert = await jose.importX509(publicKeyString, alg);

  const { payload, protectedHeader } = await jose.jwtVerify(token, cert, {
    issuer: iss,
    audience: aud,
  });
  return payload as DecodedIdToken;
};
