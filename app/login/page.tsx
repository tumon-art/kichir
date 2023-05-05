import styles from "./page.module.css";
import prismaClient from "@/lib/prisma";
import LoginComp from "../comps/LoginComp";
import Trends from "../comps/Trends";
import Container from "../comps/dls/Container";
import HeaderH2 from "../comps/dls/HeaderH2";

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
        <Container mt3em>
          <HeaderH2 big> Trends for world </HeaderH2>
          <Trends hashTags={hashTags} />
        </Container>
      </div>
    </main>
  );
}
