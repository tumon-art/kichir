import { Logo } from "./comps/Icons";
import Isloggedin from "./isLoggedIn";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.nav}>
      <Logo />
      <h1> Kichir </h1>
      <div className={styles.loginHold}>
        <Isloggedin />
      </div>
    </div>
  );
}
