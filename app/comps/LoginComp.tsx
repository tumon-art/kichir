"use client";
import { GoogleLogo } from "./Icons";
import styles from "./LoginComp.module.css";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginComp() {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");

  if (session) return null;
  return (
    <div className={styles.main}>
      <div className={styles.texts}>
        <h2> New to Kichir? </h2>
        <p className={styles.p}>
          Sign up now to get your own personalized timeline!
        </p>
      </div>
      <div className={styles.customEmail}>
        <input
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder="email@email.com"
        />
        <button onClick={() => signIn("email", { email })}>
          Continue with Email
        </button>
      </div>
      <div
        onClick={() => {
          signIn("google");
        }}
        className={styles.loginBtn}
      >
        <GoogleLogo cssStyles={styles.googleLogo} />
        <span> Continue with Google </span>
      </div>
      <p className={styles.p2}>
        By signing up, you agree to the <span>Terms of Service</span> and
        <span> Privacy Policy</span>, including <span>Cookie</span> Use.
      </p>
    </div>
  );
}
