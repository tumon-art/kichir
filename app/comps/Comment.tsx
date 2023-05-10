import Image from "next/image";
import styles from "./Comment.module.css";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import Container from "./dls/Container";
import { mutate } from "swr";
import { toast } from "react-hot-toast";

export default function Comment({
  kichirId,
  session,
  defaultImg,
}: {
  kichirId: number;
  session: Session | null;
  defaultImg: string;
}) {
  const [commentText, setCommentText] = useState("");

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kichirId: kichirId, commentText: commentText }),
    })
      .then((r) => {
        setCommentText("");
        mutate(`/api/getcomment?id=${kichirId}`);
        toast("Comment added successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className={styles.main}>
      <Container px1em>
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
              placeholder={`Reply Kichir`}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.Btn}>
            Reply
          </button>
        </form>
      </Container>
    </main>
  );
}
