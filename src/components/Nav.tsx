"use client";

import { LoginInPlaceWait } from "@/components/LoginInPlaceWait";
import { LogoutInPlaceWait } from "@/components/LogoutInPlaceWait";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      router.refresh();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <>
      <ul className="list-disc list-inside mt-2">
        <li>
          <Link href="/" className="underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/user" className="underline">
            User Status
          </Link>
        </li>
        <li>
          <Link href="/user2" className="underline">
            User Status (duplicate)
          </Link>
        </li>
        <li>
          <Link href="/private" className="underline">
            Authenticated Route (/private)
          </Link>
        </li>
      </ul>
      <ul className="list-disc list-inside mt-2">
        <li>
          <Link
            href={`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`}
            className="underline"
          >
            Login with Redirect
          </Link>
        </li>
        <li>
          <Link href="/auth/logout" className="underline">
            Logout with Redirect
          </Link>
        </li>
      </ul>
      <ul className="list-disc list-inside mt-2">
        <li>
          <Link
            href={`/auth/login/wait?callbackUrl=${encodeURIComponent(pathname)}`}
            className="underline"
          >
            Login With Redirect (wait for service worker to respond)
          </Link>
        </li>
        <li>
          <Link href="/auth/logout/wait" className="underline">
            Logout with Callback (wait for service worker to respond)
          </Link>
        </li>
      </ul>
      <ul className="list-disc list-inside mt-2">
        <li>
          <button onClick={handleLoginWithGoogle} className="underline">
            Login in Place
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="underline">
            Logout in Place
          </button>
        </li>
      </ul>
      <ul className="list-disc list-inside mt-2 mb-4">
        <li>
          <LoginInPlaceWait />
        </li>
        <li>
          <LogoutInPlaceWait />
        </li>
      </ul>
    </>
  );
};
