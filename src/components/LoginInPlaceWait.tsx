"use client";

import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export const LoginInPlaceWait = ({ callbackUrl }: { callbackUrl?: string }) => {
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    const broadcastChannel = new BroadcastChannel("authBroadcast");
    broadcastChannel.onmessage = (event) => {
      console.log("LoginInPlaceWait received broadcast message", event.data);
      router.refresh();
      broadcastChannel.close();
    };
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
      broadcastChannel.close();
    }
  };

  return (
    <button className="underline" onClick={handleLoginWithGoogle}>
      Login In Place (wait for service worker to respond)
    </button>
  );
};
