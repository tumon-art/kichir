"use client";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import Container from "./dls/Container";
import useOnOutSideClick from "./hooks/useOnOutSideClick";
import { Emoji, Feather, Globe, Photo } from "./Icons";
import Modal from "./Modal";
import styles from "./PostKichir.module.css";

export default function PostKichir() {
  const { data: session } = useSession();
  const [text, setText] = useState<any>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  //Img
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const refEmojiComp = useRef<HTMLDivElement>(null);

  const textAreaFocus = () => {
    refTextArea.current?.focus();
  };

  useOnOutSideClick(refEmojiComp, () => {
    console.log("outside");
    setShowEmoji(false);
  });

  return (
    <Container>
      <div id="writeKichir" className={styles.main}>
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
              fetch("/api/kichir", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ kichir: text }),
              })
                .then((r) => console.log(r))
                .catch((err) => console.log(err));
              setText("");
            }}
            className={styles.form}
          >
            <textarea
              ref={refTextArea}
              maxLength={100}
              className={styles.textArea}
              placeholder={`What's going on?`}
              value={String(text)}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <span className={styles.spanText}>
              <Globe cssStyles={styles.globeSvg} /> Everyone can see
            </span>
            {/* --- Sect2 Footer */}
            <div className={styles.footerHold}>
              <div className={styles.iconsHold}>
                <div onClick={() => setShowEmoji((p) => !p)}>
                  <Emoji cssStyles={styles.emojiSvg} />
                </div>
                <label htmlFor="imageUpload">
                  <div>
                    <Photo cssStyles={styles.photoImage} />
                    <input
                      className={styles.imgUploader}
                      accept="image/jpeg,image/png,image/jpg"
                      type="file"
                      id="imageUpload"
                    />
                  </div>
                </label>
              </div>
              <button type="submit"> Kichir </button>
            </div>
          </form>
        </div>
        {showEmoji && (
          <div className={styles.emojiCompHold} ref={refEmojiComp}>
            <EmojiPicker
              theme={Theme.AUTO}
              emojiStyle={EmojiStyle.TWITTER}
              onEmojiClick={(e) => setText((p: any) => p + e.emoji)}
            />
          </div>
        )}
        <div onClick={textAreaFocus} className={styles.featherHold}>
          <Feather cssStyles={styles.feather} />
        </div>
      </div>
    </Container>
  );
}
