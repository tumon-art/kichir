import styles from "./KichirComp.module.css";
import ImageModal from "./dls/ImageModal";
import { toast } from "react-hot-toast";
import { CommentIcon, Ellipsis, Love, View, XMark } from "./Icons";
import Image from "next/image";
import Link from "next/link";
import Container from "./dls/Container";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import dayjs from "../../lib/tools/dayjsConfig";
import { AllKichris } from "./ShowKichirs";
import Comment from "./Comment";
import ShowComments from "./ShowComments";
import randomInt from "@/lib/tools/randomInt";
import defaultImg from "@/lib/tools/deaultImg";
import { DialogModalWrapper } from "./dls/DialogModalWrapper";

export default function KichirComp({ kichir }: { kichir: AllKichris }) {
  console.log("Kichir Comp");
  const { data: session } = useSession();
  const [imageModal, setImageModal] = useState<string>();
  const [isLiked, setisLiked] = useState<boolean>();

  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    kichir.loves.forEach(
      (e) => e.userId === session?.user?.id && setisLiked(true)
    );
  }, []);

  // Handle LOVE POST
  const handleLove = async (kichirId: number, userId: string) => {
    setisLiked(!isLiked);

    await fetch("/api/love", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kichirId, userId }),
    })
      .then((r) => {
        r.json();
        // mutateKichir();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container key={kichir.id} px1em>
        {/* <DialogModal dialogRef={dialogRef}>
          <h2> Wanna Delete This Kichir? </h2>
          <div className={styles.askHold}>
            <div
              onClick={async () => {
                async function deleteKichir() {
                  return fetch(`/api/deletekichir?id=${kichir?.id}`, {
                    method: "DELETE",
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Network response was not ok");
                      }
                      toast("Kichir deleted successfully");
                      return response.json();
                    })
                    .catch((error) => {
                      console.error("Error deleting Kichir:", error);
                    });
                }
                deleteKichir();
                dialogRef.current?.close();
              }}
            >
              Yes
            </div>
            <div
              onClick={() => {
                dialogRef.current?.close();
              }}
            >
              No
            </div>
          </div>
        </DialogModal> */}
        <div className={styles.card}>
          <div className={styles.cardSect2}>
            {/* --- CARD TOP HEAD */}
            <div className={styles.cardTop}>
              <div className={styles.cardTopSect1}>
                <div className={styles.imgHoldMobile}>
                  <Image
                    src={kichir.author.image || defaultImg}
                    alt="author"
                    height={40}
                    width={40}
                    className={styles.authorImg}
                  />
                </div>
                <Link href={`kichir/name`}>
                  <span className={styles.name}> {kichir.author.name} </span>
                </Link>
                <span className={styles.uname}> @{kichir.author.uname} </span>
                <span className={styles.timehold}>
                  <span className={styles.dot}></span>
                  <span className={styles.time}>
                    {dayjs(kichir.createdAt).fromNow()}
                  </span>
                </span>
              </div>
              {/* <span
                className={styles.ellipsisIconHold}
                onClick={() => {
                  if (session?.user?.id === kichir.authorId)
                    dialogRef.current?.showModal();
                }}
              >
                <Ellipsis />
              </span> */}
              <DialogModalWrapper modalRef={dialogRef} defaultTrigger={false}
                customTrigger={() => {
                  if (session?.user?.id === kichir.authorId)
                    dialogRef.current?.showModal();
                }
                }
                preDialogContent={
                  <span
                    className={styles.ellipsisIconHold}
                    onClick={() => {
                      if (session?.user?.id === kichir.authorId)
                        dialogRef.current?.showModal();
                    }}
                  >
                    <Ellipsis />
                  </span>

                }>
                <div className={styles.modalContantHold}>
                  <h2> Wanna Delete This Kichir? </h2>
                  <div className={styles.askHold}>
                    <div
                      onClick={async () => {
                        async function deleteKichir() {
                          return fetch(`/api/deletekichir?id=${kichir?.id}`, {
                            method: "DELETE",
                          })
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error("Network response was not ok");
                              }
                              toast("Kichir deleted successfully");
                              return response.json();
                            })
                            .catch((error) => {
                              console.error("Error deleting Kichir:", error);
                            });
                        }
                        deleteKichir();
                        dialogRef.current?.close();
                      }}
                    >
                      Yes
                    </div>
                    <div
                      onClick={() => {
                        dialogRef.current?.close();
                      }}
                    >
                      No
                    </div>
                  </div>
                </div>

              </DialogModalWrapper>
            </div>

            {/* --- CARD BODY TEXT */}
            <div className={styles.bodyText}>{kichir.body}</div>

            {/* --- CARD IMAGE */}
            {kichir.img && (
              <div className={styles.kichirImageHold}>
                <Image
                  src={kichir.img}
                  height="360"
                  width="440"
                  alt="Image"
                  className={styles.kichirImage}
                  onClick={() => setImageModal(kichir.img!)}
                />
              </div>
            )}

            {/* --- CARD FOOTER */}
            <div className={styles.cardFooter}>
              <div
                className={styles.iconHold}
                onClick={() => {
                  handleLove(kichir.id, String(session?.user?.id));
                  if (isLiked) kichir.loves.pop();
                  else
                    kichir.loves.push({
                      id: "demo",
                      createdAt: new Date(),
                      kichirId: 123,
                      userId: "333",
                    });
                }}
              >
                <Love
                  cssStyles={`${styles.loveIcon} ${isLiked && styles.loveFilled
                    }`}
                />
                <span> {kichir.loves.length}</span>
              </div>

              <div className={styles.iconHold}>
                <CommentIcon cssStyles={styles.loveIcon} />
                <span> {kichir.comments.length} </span>
              </div>
              <div className={styles.iconHold}>
                <View cssStyles={styles.ViewIcon} />
                <span> {randomInt(50, 200)} </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- IMAGE MODAL  */}
        {imageModal && (
          <ImageModal setImageModel={setImageModal}>
            {/* --- X button for Preveiw */}
            <span onClick={() => setImageModal(undefined)}>
              <XMark cssStyles={styles.xMarkIcon} />
            </span>
            <Image
              src={imageModal}
              height="360"
              width="490"
              alt="Image"
              className={styles.imageModal}
            />
          </ImageModal>
        )}
      </Container>
      {/* COMMENT COMPONENT */}
      {session && <Comment kichirId={kichir.id} session={session} defaultImg={defaultImg} />}

      {/* SHOW ALL COMMENTS */}
      <ShowComments session={session} kichirId={kichir.id} />
    </>
  );
}
