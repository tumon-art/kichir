import styles from "./page.module.css";
import Isloggedin from "./isLoggedIn";
import { Inter } from "next/font/google";
import Logo from "./comps/icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.nav}>
        <Logo />
        <h1> Kichir </h1>
        <div className={styles.loginHold}>
          <Isloggedin />
        </div>
      </div>
    </main>
  );
}
