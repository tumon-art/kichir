import Image from "next/image";
import styles from "./Comment.module.css";
import { Session } from "next-auth";
import { useRef, useState } from "react";

export default function Comment({
  session,
  defaultImg,
}: {
  session: Session | null;
  defaultImg: string;
}) {
  const devRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState("");

  const handleChange = (event: React.SyntheticEvent<HTMLDivElement>) => {
    console.log(devRef.current?.textContent?.split("").reverse().join(""));
    const target = event.currentTarget as HTMLDivElement;
    setContent(devRef.current?.textContent?.split("").reverse().join("") || "");
  };
  return (
    <main className={styles.main}>
      <div className={styles.AvaterNcommentHold}>
        <Image
          src={String(session?.user?.image) || defaultImg}
          height="30"
          width="30"
          alt="img"
          className={styles.img}
        />
        <div className={styles.comment}>
          <textarea
            maxLength={200}
            className={styles.textArea}
            placeholder={`Reply Kichri`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
      </div>
      <div>
        <button className={styles.Btn}> Reply </button>
      </div>
    </main>
  );
}
