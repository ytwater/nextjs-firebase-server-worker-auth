import { LoginWithCallback } from "@/components/LoginWithCallback";

export default async function LoginWithCallbackPage({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <main>
      <LoginWithCallback callbackUrl={callbackUrl} />
    </main>
  );
}
