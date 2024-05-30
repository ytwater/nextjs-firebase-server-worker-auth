import { LogoutWithCallbackWait } from "@/components/LogoutWithCallbackWait";

export default async function LogoutWithCallbackPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <main>
      <LogoutWithCallbackWait callbackUrl={callbackUrl} />
    </main>
  );
}
