import { Comment } from "@prisma/client";
import { fetcherGET } from "./ShowKichirs";
import useSWR, { mutate } from "swr";
import styles from "./ShowComments.module.css";
import dayjs, { Dayjs } from "dayjs";
import { Ellipsis } from "./Icons";
import Image from "next/image";
import defaultImg from "@/lib/tools/deaultImg";
import Container from "./dls/Container";
import { useState } from "react";
import { Session } from "next-auth";
import Modal from "./dls/Modal";
import { toast } from "react-hot-toast";

interface CommentWithAuthorName extends Comment {
  author: {
    name: string | null;
    image: string | null;
    uname: string | null;
  };
}

export default function ShowComments({
  kichirId,
  session,
}: {
  kichirId: number;
  session: Session | null;
}) {
  const [selectedElement, setSelectedElement] = useState<Comment>();
  const { data, isLoading, error } = useSWR<CommentWithAuthorName[]>(
    `/api/getcomment?id=${kichirId}`,
    fetcherGET
  );

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No comments found</div>;
  console.log(data);

  return (
    <div className={styles.main}>
      {data.map((commnet: CommentWithAuthorName) => {
        return (
          <Container bB1px px1em key={commnet.id}>
            <div className={styles.card}>
              <div className={styles.imgHold}>
                <Image
                  src={commnet.author.image || defaultImg}
                  alt="author"
                  height={40}
                  width={40}
                  className={styles.authorImg}
                />
              </div>
              <div className={styles.cardSect2}>
                {/* --- CARD TOP HEAD */}
                <div className={styles.cardTop}>
                  <div className={styles.cardTopSect1}>
                    <span className={styles.name}> {commnet.author.name} </span>
                    <span className={styles.uname}>
                      @{commnet.author.uname}
                    </span>
                    <span className={styles.timehold}>
                      <span className={styles.dot}></span>
                      <span className={styles.time}>
                        {dayjs(commnet.createdAt).fromNow()}
                      </span>
                    </span>
                  </div>
                  <span
                    className={styles.ellipsisIconHold}
                    onClick={() => {
                      if (session?.user?.id === commnet.authorId)
                        setSelectedElement(commnet);
                    }}
                  >
                    <Ellipsis />
                  </span>
                </div>

                <div className={styles.bodyText}>{commnet.body}</div>
              </div>
            </div>
          </Container>
        );
      })}

      {/* --- DELETE KICHIR MODAL */}
      {selectedElement ? (
        <Modal cssStyles={styles.customModal} setModel={setSelectedElement}>
          <h2> Wanna Delete This Kichir? </h2>
          <div className={styles.askHold}>
            <div
              onClick={ () => {
                setSelectedElement(undefined);
                fetch(`/api/deletecomment?id=${selectedElement?.id}`, {
                    method: "DELETE",
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Network response was not ok");
                      }
                      mutate(`/api/getcomment?id=${kichirId}`);
                      toast("Comment deleted successfully");
                      return response.json();
                    })
                    .catch((error) => {
                      console.error("Error deleting Comment:", error);
                    });

              }}
            >
              Yes
            </div>
            <div
              onClick={() => {
                setSelectedElement(undefined);
              }}
            >
              No
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
