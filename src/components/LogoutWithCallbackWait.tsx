"use client";

import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LogoutWithCallbackWait = ({
  callbackUrl,
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel("authBroadcast");
    broadcastChannel.onmessage = (event) => {
      console.log(
        "LogoutWithCallbackWait received broadcast message",
        event.data,
      );
      const url = callbackUrl || "/";
      router.push(url);
      broadcastChannel.close();
    };
    try {
      signOut();
    } catch (error) {
      console.error("Error signing in with Google", error);
      broadcastChannel.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>logging out</p>;
};
