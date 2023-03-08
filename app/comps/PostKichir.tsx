"use client";
import { url } from "inspector";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Container from "./dls/Container";
import { Emoji } from "./Icons";
import styles from "./PostKichir.module.css";

export default function PostKichir() {
  const { data: session } = useSession();

  return (
    <Container>
      <div className={styles.main}>
        <div className={styles.sect1}>
          <Image
            src={String(
              session
                ? session.user?.image
                : "https://previews.123rf.com/images/miketea/miketea1411/miketea141100285/33835661-green-pixel-art-style-pixel-background.jpg"
            )}
            alt="img"
            width="20"
            height="20"
            className={styles.img}
          />
        </div>
        <div className={styles.sect2}>
          <textarea
            className={styles.textArea}
            placeholder={`What's going on?`}
            contentEditable
          ></textarea>
          {/* --- Sect2 Footer */}
          <div className={styles.footerHold}>
            <div>
              <Emoji cssStyles={styles.emojiSvg} />
            </div>
            <button> Kichir </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
