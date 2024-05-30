import { ClientUserOutput } from "@/components/ClientUserOutput";
import {
  cachedGetAuthenticatedAppForUser,
  getBearerToken,
} from "@/lib/firebase/serverApp";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { currentUser } =
    await cachedGetAuthenticatedAppForUser(getBearerToken());

  if (!currentUser) {
    return (
      <main>
        <h2 className="text-xl">Private Page</h2>
        <p>You shouldn&apos;t be here</p>
      </main>
    );
  }

  return (
    <main>
      <h2 className="text-xl">Private Page</h2>
      <h3 className="text-lg">
        Welcome {currentUser.displayName} This is a private page for
        authenticated users only.
      </h3>
      <div className="flex flex-row width-full">
        <div className="flex-1 overflow-auto">
          <h3 className="text-lg">Server Side</h3>
          <pre>{JSON.stringify(currentUser.toJSON(), null, 2)}</pre>
        </div>
        <div className="flex-1 overflow-auto">
          <ClientUserOutput />
        </div>
      </div>
    </main>
  );
}
