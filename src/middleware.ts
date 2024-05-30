import { validateFirebaseIdToken } from "@/lib/firebase/validateFirebaseIdToken";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // extract bearer token
  const idToken = headers().get("Authorization")?.split("Bearer ")[1];
  const decoded = idToken && (await validateFirebaseIdToken(idToken));

  if (decoded) {
    console.log("middleware userId", decoded.sub, decoded.email);
  } else {
    console.log("middleware no user");
  }
  if (!decoded) {
    // logged out and we are on a private route, redirect to login
    return NextResponse.redirect(
      new URL(
        `/auth/login/wait?callbackUrl=${encodeURIComponent(
          // `/auth/login?callbackUrl=${encodeURIComponent(
          req.nextUrl?.pathname ?? "/",
        )}`,
        req.url,
      ),
    );
  }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/private"],
};
