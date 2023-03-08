"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Container from "./dls/Container";
import { Emoji } from "./Icons";
import styles from "./PostKichir.module.css";

export default function PostKichir() {
  const { data: session } = useSession();
  const [text, setText] = useState<String>("");

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(session);
            }}
          >
            <textarea
              maxLength={10}
              className={styles.textArea}
              placeholder={`What's going on?`}
              value={String(text)}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            {/* --- Sect2 Footer */}
            <div className={styles.footerHold}>
              <div>
                <Emoji cssStyles={styles.emojiSvg} />
              </div>
              <button type="submit"> Kichir </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
