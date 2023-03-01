import styles from "./page.module.css";
import Isloggedin from "./isLoggedIn";
import { Inter } from "next/font/google";
import { Logo } from "./comps/Icons";
import LoginComp from "./comps/LoginComp";
import Trends from "./comps/Trends";
import prismaClient from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"] });

async function getData() {
  const tags = await prismaClient?.hashTags.findMany({
    include: {
      categories: true,
    },
  });
  return tags;
}

prismaClient;
export default async function Home() {
  const hashTags = await getData();

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
        <Trends hashTags={hashTags} />
      </div>
    </main>
  );
}
