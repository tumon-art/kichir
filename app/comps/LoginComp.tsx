"use client";
import { GoogleLogo } from "./Icons";
import styles from "./LoginComp.module.css";
import { useSession, signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import Container from "./dls/Container";
import TextLinkSpan from "./dls/TextLinkSpan";
import AddInfo from "./AddInfo";

export default function LoginComp() {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");

  // --- Add Info Comp
  if (session) return <AddInfo session={session} />;

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn("email", { email });
  };

  return (
    <Container px1em mt3em>
      <div className={styles.main}>
        <div className={styles.texts}>
          <h2> New to Kichir? </h2>
          <p className={styles.p}>
            Sign up now to get your own personalized timeline!
          </p>
        </div>

        <form className={styles.customEmail} onSubmit={onFormSubmit}>
          <input
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="email@mail.com"
          />
          <button type="submit">Continue with Email</button>
        </form>

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
          By signing up, you agree to the{" "}
          <TextLinkSpan>Terms of Service</TextLinkSpan> and
          <TextLinkSpan> Privacy Policy </TextLinkSpan>, including{" "}
          <TextLinkSpan>Cookie</TextLinkSpan> Use.
        </p>
      </div>
    </Container>
  );
}
