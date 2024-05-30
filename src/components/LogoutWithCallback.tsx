"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LogoutWithCallback = ({
  callbackUrl,
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();
  const [errorText, setErrorText] = useState("");

  const handleLogout = async () => {
    try {
      setErrorText("");
      await signOut();
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

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <h2 className="text-xl">Logout with Callback</h2>
      <ErrorAlert errorText={errorText} onClose={() => setErrorText("")} />
      <p>Logging Out</p>
    </main>
  );
};
