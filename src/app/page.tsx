import {
  cachedGetAuthenticatedAppForUser,
  getBearerToken,
} from "@/lib/firebase/serverApp";

export default async function Home() {
  const { currentUser } =
    await cachedGetAuthenticatedAppForUser(getBearerToken());

  return (
    <div>
      <h2 className="text-xl">Firebase Serverworker Auth</h2>
      <h3 className="text-lg">
        Welcome {currentUser ? currentUser.displayName : "guest"}
      </h3>
      <p>There are three navigation items above:</p>
      <ul className="list-disc list-inside">
        <li>Home (this page), server rendered</li>
        <li>User Status server and client rendered</li>
        <li>
          Authenticated Route, this will force middleware to login via a
          redirect to /auth/login
        </li>
      </ul>
    </div>
  );
}
