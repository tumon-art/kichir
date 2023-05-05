"use client";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import Container from "./dls/Container";
import useOnOutSideClick from "./hooks/useOnOutSideClick";
import { Emoji, Feather, Globe, Photo, XMark } from "./Icons";
import styles from "./PostKichir.module.css";
import { mutate } from "swr";
import { toast } from "react-hot-toast";
import Spinner from "./dls/Spinner";

export default function PostKichir() {
  const { data: session } = useSession();
  const [loading, setloading] = useState<boolean>(false);
  const [text, setText] = useState<any>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  //Img
  const [imageSrc, setImageSrc] = useState<
    string | ArrayBuffer | null | undefined
  >(undefined);
  const [uploadData, setUploadData] = useState();

  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const refEmojiComp = useRef<HTMLDivElement>(null);

  /**
   * handleOnImgChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */
  const handleOnImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.readAsDataURL(selectedFile);

      reader.onload = (onLoadEvent) => {
        setImageSrc(onLoadEvent.target?.result);
        setUploadData(undefined);
      };
    }
  };

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */
  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setloading(true);
    const form = e.currentTarget as HTMLFormElement;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;

    const formData = new FormData();

    if (imageSrc) {
      // IF THERE IS IMAGE
      try {
        for (const file of fileInput?.files ?? []) {
          formData.append("file", file);
        }

        formData.append("upload_preset", "kichir");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/ddzez1nym/image/upload",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((r) => r.json())
          .catch((err) => err);

        console.log("image upload 1/2", res);
        if (res.error == undefined) {
          // IF NO ERROR
          fetch("/api/kichir", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ kichir: text, img: res.secure_url }),
          })
            .then((r) => {
              setText("");
              console.log("image + form submit success!");
              mutate("/api/getkichirs");
              toast("Kichir Published");
              setImageSrc(undefined);
              setloading(false);
            })
            .catch((err) => console.log(err));
        } else console.log(res.error);
      } catch (err) {
        console.log("Image Upload or Submit Err", err);
      }
    } else {
      // IF NO IMAGE
      fetch("/api/kichir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kichir: text }),
      })
        .then((r) => {
          setText("");
          console.log("file submitted w/0 image");
          mutate("/api/getkichirs");
          toast("Kichir Published");
          setImageSrc(undefined);
          setloading(false);
        })
        .catch((err) => console.log(err));
    }
  };

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
              session?.user?.image ||
                "https://previews.123rf.com/images/miketea/miketea1411/miketea141100285/33835661-green-pixel-art-style-pixel-background.jpg"
            )}
            alt="img"
            width="40"
            height="40"
            className={styles.img}
          />
        </div>
        <div className={styles.sect2}>
          {/* --- FORM  */}
          <form onSubmit={handleOnSubmit} className={styles.form}>
            <textarea
              ref={refTextArea}
              maxLength={200}
              className={styles.textArea}
              placeholder={`What's going on?`}
              value={String(text)}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            {imageSrc && (
              <div className={styles.previewContainer}>
                {/* --- X button for Preveiw */}
                <span onClick={() => setImageSrc(undefined)}>
                  <XMark cssStyles={styles.xMarkIcon} />
                </span>
                <Image
                  src={String(imageSrc)}
                  height="100"
                  width="150"
                  alt="preview"
                  className={styles.previewImg}
                />
              </div>
            )}
            <span className={styles.spanText}>
              <Globe cssStyles={styles.globeSvg} /> Everyone can see
            </span>
            {/* --- Sect2 Footer */}
            <div className={styles.footerHold}>
              <div className={styles.iconsHold}>
                <div onClick={() => setShowEmoji((p) => !p)}>
                  <Emoji cssStyles={styles.emojiSvg} />
                </div>

                {/* --- Image Upload */}
                <label htmlFor="imageUpload">
                  <div>
                    <Photo cssStyles={styles.photoImage} />
                    <input
                      className={styles.imgUploader}
                      onChange={handleOnImgChange}
                      accept="image/jpeg,image/png,image/jpg"
                      type="file"
                      id="imageUpload"
                      name="file"
                    />
                  </div>
                </label>
              </div>
              <button type={loading ? "button" : "submit"}>
                {loading ? <Spinner small white /> : "Kichir"}
              </button>
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
