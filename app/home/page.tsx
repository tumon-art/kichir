// import styles from "./page.module.css";
// import { Inter } from "next/font/google";
// import LoginComp from "./comps/LoginComp";
// import Trends from "./comps/Trends";
// import prismaClient from "@/lib/prisma";
// import Footer from "./comps/Footer";
// import Navbar from "./navbar";

// const inter = Inter({ subsets: ["latin"] });

// async function getData() {
//   const tags = await prismaClient?.hashTags.findMany({
//     include: {
//       categories: true,
//     },
//   });
//   return tags;
// }

export default async function Home() {
  // const hashTags = await getData();

  return (
    <main>
      <div>
        {/* <LoginComp />
        <Trends hashTags={hashTags} />
        <Footer /> */}
        <h2> Home Page </h2>
      </div>
    </main>
  );
}
