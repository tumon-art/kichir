"use client";
import { useSession } from "next-auth/react";
import styles from "./BigNav.module.css";
import {
  Bookmarks,
  Followers,
  HashTag,
  Home,
  Notification,
  Profile,
} from "./Icons";
import Card from "./dls/Card";
import Image from "next/image";
import Link from "next/link";

export default function BigNav() {
  const { data: session } = useSession();
  return (
    <aside className={styles.main}>
      <Card py07em>
        <Link href="/">
          <div className={styles.IconNTexthold}>
            <Home cssStyles={styles.homeSvg} />{" "}
            <span className={styles.text}> Home </span>
          </div>
        </Link>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Followers cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Followers </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Bookmarks cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Bookmarks </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Profile cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Profile </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <HashTag cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Explore </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Notification cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Notices </span>
        </div>
      </Card>

      <button className={styles.kichirBtn}>Kichir</button>
      <Card py07em>
        <div className={styles.profileHold}>
          <Image
            src={String(
              session?.user?.image ||
                "https://previews.123rf.com/images/miketea/miketea1411/miketea141100285/33835661-green-pixel-art-style-pixel-background.jpg"
            )}
            alt="img"
            width="40"
            height="40"
            className={styles.img}
          />

          <span> {session?.user?.name} </span>
        </div>
      </Card>
    </aside>
  );
}
