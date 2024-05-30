"use client";

import { Button } from "@/components/Button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export const LoginWithCallbackWait = ({
  callbackUrl,
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    const broadcastChannel = new BroadcastChannel("authBroadcast");
    broadcastChannel.onmessage = (event) => {
      console.log(
        "LoginWithCallbackWait received broadcast message",
        event.data,
      );
      const url = callbackUrl || "/";
      router.push(url);
      broadcastChannel.close();
    };

    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
      broadcastChannel.close();
    }
  };

  return <Button onClick={handleLoginWithGoogle}>Login With Google</Button>;
};
