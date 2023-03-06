import styles from "./page.module.css";
import prismaClient from "@/lib/prisma";
import LoginComp from "../comps/LoginComp";
import Trends from "../comps/Trends";

async function getData() {
  const tags = await prismaClient?.hashTags.findMany({
    include: {
      categories: true,
    },
  });
  return tags;
}

export default async function Home() {
  const hashTags = await getData();

  return (
    <main className={styles.main}>
      <div className={styles.pageBody}>
        <LoginComp />
        <Trends hashTags={hashTags} />
      </div>
    </main>
  );
}
