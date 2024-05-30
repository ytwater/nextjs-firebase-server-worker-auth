"use client";

import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export const LogoutInPlaceWait = ({
  callbackUrl,
}: {
  callbackUrl?: string;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    const broadcastChannel = new BroadcastChannel("authBroadcast");
    broadcastChannel.onmessage = (event) => {
      console.log("LogoutInPlaceWait received broadcast message", event.data);
      router.refresh();
      broadcastChannel.close();
    };
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);
      broadcastChannel.close();
    }
  };

  return (
    <button className="underline" onClick={handleLogout}>
      Logout In Place (wait for service worker to respond)
    </button>
  );
};
