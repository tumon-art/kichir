import Link from "next/link";
import { Logo } from "./comps/Icons";
import Isloggedin from "./isLoggedIn";
import styles from "./navbar.module.css";
import DarkModeToggle from "./comps/dls/DarkModeToggle";

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <Link href="/" aria-label="Kichir Home">
        <Logo />
      </Link>
      <h1> Kichir </h1>
      <div className={styles.loginHold}>
        {/* <Isloggedin /> */}
        <DarkModeToggle />
      </div>
      {/* <button
        onClick={() => {
          const root = document.documentElement;
          root.classList.toggle("darkMode");
        }}
      >
        Toggle Dark Mode
      </button> */}
    </div>
  );
}
