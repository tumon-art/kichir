import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import Provider from "./provider";
import Container from "./comps/dls/Container";
import BigNav from "./comps/BigNav";
import prismaClient from "@/lib/prisma";
import RightSect from "./comps/RightSect";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kichir",
  description: "Micor-Bloging site",
};

async function getData() {
  // FETCH TAGS
  const tags = await prismaClient?.hashTags.findMany({
    include: {
      categories: true,
    },
  });

  // FETCH USERS
  const users = await prismaClient?.user.findMany({
    take: 5,
  });

  return { tags, users };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tags: hashTags, users } = await getData();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="pageBody">
            <section className="sect1">
              <Container mt3em>
                <BigNav />
              </Container>
            </section>
            <div className="mainBody">
              <>
                <div>
                  <Navbar />
                  {children}
                </div>
                <RightSect hashTags={hashTags} users={users} />
              </>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
}
