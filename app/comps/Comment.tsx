import Image from "next/image";
import styles from "./Comment.module.css";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";

export default function Comment({
  session,
  defaultImg,
}: {
  session: Session | null;
  defaultImg: string;
}) {
  const [commentText, setCommentText] = useState("");

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("form submit");
  };

  return (
    <main className={styles.main}>
      <form onSubmit={onFormSubmit} className={styles.comment}>
        <div className={styles.AvaterNcommentHold}>
          <Image
            src={session?.user?.image || defaultImg}
            height="30"
            width="30"
            alt="img"
            className={styles.img}
          />
          <textarea
            maxLength={200}
            className={styles.textArea}
            placeholder={`Reply Kichri`}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.Btn}>
          Reply
        </button>
      </form>
    </main>
  );
}
