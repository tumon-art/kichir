import styles from "./page.module.css";
import { Feather } from "./comps/Icons";
import PostKichir from "./comps/PostKichir";
import Container from "./comps/dls/Container";
import ShowKichirs from "./comps/ShowKichirs";

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
    <main className={styles.pageBody}>
      <Container>
        <PostKichir />
        <ShowKichirs />
        <div className={styles.featherHold}>
          <Feather cssStyles={styles.feather} />
        </div>
      </Container>
    </main>
  );
}
