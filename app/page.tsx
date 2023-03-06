import styles from "./page.module.css";
import { Inter } from "next/font/google";
import LoginComp from "./comps/LoginComp";
import Trends from "./comps/Trends";
import prismaClient from "@/lib/prisma";
import Footer from "./comps/Footer";
import Navbar from "./navbar";
import { Feather } from "./comps/Icons";
import PostKichir from "./comps/PostKichir";

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
    <main className={styles.pageBody}>
      {/* <Navbar />
      <div className={styles.pageBody}>
        <LoginComp />
        <Trends hashTags={hashTags} />
        <Footer />
      </div> */}
      <h1> Home Page </h1>
      <PostKichir />
      <div className={styles.featherHold}>
        <Feather cssStyles={styles.feather} />
      </div>
    </main>
  );
}
