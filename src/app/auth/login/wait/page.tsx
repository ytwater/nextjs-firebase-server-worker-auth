import { LoginWithCallbackWait } from "@/components/LoginWithCallbackWait";

export default async function LoginWithCallbackPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <main>
      <LoginWithCallbackWait callbackUrl={callbackUrl} />
    </main>
  );
}
