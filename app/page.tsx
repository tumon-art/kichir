import styles from "./page.module.css";
import Isloggedin from "./isLoggedIn";
import { Inter } from "next/font/google";
import { Logo } from "./comps/Icons";
import LoginComp from "./comps/LoginComp";
import Trends from "./comps/Trends";

const inter = Inter({ subsets: ["latin"] });

async function getData() {
  try {
    const tags = await prisma?.hashTags.findMany()
    return tags
  } catch (err) {
    return err
  }
}

export default async function Home() {
  const hashTags = await getData()

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.nav}>
        <Logo />
        <h1> Kichir </h1>
        <div className={styles.loginHold}>
          <Isloggedin />
        </div>
      </div>
      <div className={styles.pageBody}>
        <LoginComp />
      </div>
      <Trends hashTags={hashTags} />
    </main>
  );
}
