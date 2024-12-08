import { Categories, HashTags, User } from "@prisma/client";
import Footer from "./Footer";
import styles from "./RightSect.module.css";
import ToFollow from "./ToFollow";
import Trends from "./Trends";
import Container from "./dls/Container";
import HeaderH2 from "./dls/HeaderH2";

export default function RightSect({
  hashTags,
  users,
}: {
  hashTags: (HashTags & {
    categories: Categories[];
  })[];
  users: User[];
}) {
  return (
    <div className={styles.subSect}>
      <Container mt3em>
        <HeaderH2 big> Trends for you</HeaderH2>
        <Trends hashTags={hashTags} />
      </Container>

      <div className={styles.toFollowHold}>
        <Container mt3em>
          <HeaderH2 big>Who to follow</HeaderH2>
          <ToFollow users={users} />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
