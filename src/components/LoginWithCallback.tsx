"use client";

import { Button } from "@/components/Button";
import { ErrorAlert } from "@/components/ErrorAlert";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginWithCallback = ({
  callbackUrl,
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();
  const [errorText, setErrorText] = useState("");

  const handleLoginWithGoogle = async () => {
    try {
      setErrorText("");
      await signInWithGoogle();
      const url = callbackUrl || "/";
      // router.prefetch(url);
      // router.push(url);
      window.location.href = url;
    } catch (error) {
      console.error("Error signing in with Google", error);
      setErrorText(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  };

  return (
    <main>
      <h2 className="text-xl">Login with Callback</h2>
      <ErrorAlert errorText={errorText} onClose={() => setErrorText("")} />
      <Button onClick={handleLoginWithGoogle}>Login With Google</Button>
    </main>
  );
};
