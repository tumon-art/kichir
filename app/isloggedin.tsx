"use client";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Isloggedin() {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
    return <button onClick={() => signOut()}> Sign out</button>;
  } else return <button onClick={() => signIn()}> Sign in</button>;
}
