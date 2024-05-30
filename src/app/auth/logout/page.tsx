import { LogoutWithCallback } from "@/components/LogoutWithCallback";

export default async function LogoutWithCallbackPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <main>
      <LogoutWithCallback callbackUrl={callbackUrl} />
    </main>
  );
}
