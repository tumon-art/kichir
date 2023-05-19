import Link from "next/link";
import { Logo } from "./comps/Icons";
import Isloggedin from "./isLoggedIn";
import styles from "./navbar.module.css";

export default function Navbar() {
  return null;
  return (
    <div className={styles.nav}>
      <Link href="/">
        <Logo />
      </Link>
      <h1> Kichir </h1>
      <div className={styles.loginHold}>
        <Isloggedin />
      </div>
    </div>
  );
}
