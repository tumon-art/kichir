"use client";
import { GoogleLogo } from "./Icons";
import styles from "./LoginComp.module.css";

export default function LoginComp() {
  return (
    <div className={styles.main}>
      <GoogleLogo cssStyles={styles.googleLogo} />
      <span> Continue with Google </span>
    </div>
  );
}
