import { initializeApp } from "firebase/app";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { getInstallations, getToken } from "firebase/installations";

// this is set during install
let firebaseConfig;
let app;
let auth;
const authBroadcast = new BroadcastChannel("authBroadcast");

self.addEventListener("install", (event) => {
  // extract firebase config from query string
  const serializedFirebaseConfig = new URL(location).searchParams.get(
    "firebaseConfig",
  );

  if (!serializedFirebaseConfig) {
    throw new Error(
      "Firebase Config object not found in service worker query string.",
    );
  }

  firebaseConfig = JSON.parse(serializedFirebaseConfig);
  console.log("Service worker installed with Firebase config", firebaseConfig);
  // Initialize the Firebase app in the service worker script.
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  onAuthStateChanged(auth, async (user) => {
    console.log("auth state changed", !!user);
    if (user) {
      // Make sure authToken and IdToken are available to the service worker
      await user.getIdToken();
      await getAuthIdToken(auth);
    }
    // Tell the webapp that the auth state has changed
    authBroadcast.postMessage({ loggedIn: !!user });
  });
});

self.addEventListener("fetch", (event) => {
  const { origin } = new URL(event.request.url);
  if (origin !== self.location.origin) return;
  event.respondWith(fetchWithFirebaseHeaders(event.request));
});

async function fetchWithFirebaseHeaders(request) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const installations = getInstallations(app);
  const headers = new Headers(request.headers);
  const [authIdToken, installationToken] = await Promise.all([
    getAuthIdToken(auth),
    getToken(installations),
  ]);
  headers.append("Firebase-Instance-ID-Token", installationToken);
  if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`);
  const newRequest = new Request(request, { headers });
  return await fetch(newRequest);
}

async function getAuthIdToken(auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;
  return await getIdToken(auth.currentUser);
}
