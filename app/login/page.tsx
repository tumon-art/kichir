import styles from "./page.module.css";
import { Inter } from "next/font/google";
import prismaClient from "@/lib/prisma";
import LoginComp from "../comps/LoginComp";
import Trends from "../comps/Trends";
import Footer from "../comps/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.pageBody}>
        <LoginComp />
        <Trends hashTags={hashTags} />
        <Footer />
      </div>
    </main>
  );
}
