"use client";

import { useAuth } from "@/components/AuthProvider";

export const ClientUserOutput = () => {
  const { user } = useAuth();
  return (
    <>
      <h3 className="text-lg">Client Side</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};
