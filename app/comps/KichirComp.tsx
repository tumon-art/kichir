import styles from "./KichirComp.module.css";
import ImageModal from "./dls/ImageModal";
import { toast } from "react-hot-toast";
import Modal from "./dls/Modal";
import { CommentIcon, Ellipsis, Love, View, XMark } from "./Icons";
import Image from "next/image";
import Link from "next/link";
import Container from "./dls/Container";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { AllKichris } from "./ShowKichirs";
import Comment from "./Comment";
import useSWR from "swr";
import ShowComments from "./ShowComments";

export default function KichirComp({ kichir }: { kichir: AllKichris }) {
  console.log("Kichir Comp");
  const { data: session } = useSession();
  const [selectedElement, setSelectedElement] = useState<AllKichris>();
  const [imageModal, setImageModal] = useState<string>();
  const [isLiked, setisLiked] = useState<boolean>();

  const defaultImg =
    "https://previews.123rf.com/images/miketea/miketea1411/miketea141100285/33835661-green-pixel-art-style-pixel-background.jpg";

  useEffect(() => {
    kichir.loves.forEach(
      (e) => e.userId === session?.user?.id && setisLiked(true)
    );
  }, []);

  // --- DAY.JS CONFIG
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "now",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1 month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });

  // Generate Random number
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

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
    <Container key={kichir.id} px1em>
      <div className={styles.card}>
        <div className={styles.imgHold}>
          <Image
            src={kichir.author.image || defaultImg}
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
              <div className={styles.imgHoldMobile}>
                <Image
                  src={kichir.author.image || defaultImg}
                  alt="author"
                  height={30}
                  width={30}
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
            <span
              className={styles.ellipsisIconHold}
              onClick={() => {
                if (session?.user?.id === kichir.authorId)
                  setSelectedElement(kichir);
              }}
            >
              <Ellipsis />
            </span>
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
                cssStyles={`${styles.loveIcon} ${isLiked && styles.loveFilled}`}
              />
              <span> {kichir.loves.length}</span>
            </div>

            <div className={styles.iconHold}>
              <CommentIcon cssStyles={styles.loveIcon} />
              <span> {randomInt(1, 10)} </span>
            </div>
            <div className={styles.iconHold}>
              <View cssStyles={styles.ViewIcon} />
              <span> {randomInt(50, 200)} </span>
            </div>
          </div>

          {/* COMMENT COMPONENT */}
          <Comment
            kichirId={kichir.id}
            session={session}
            defaultImg={defaultImg}
          />
        </div>
      </div>

      {/* SHOW ALL COMMENTS */}
      <ShowComments kichirId={kichir.id} />

      {/* --- DELETE KICHIR MODAL */}
      {selectedElement ? (
        <Modal cssStyles={styles.customModal} setModel={setSelectedElement}>
          <h2> Wanna Delete This Kichir? </h2>
          <div className={styles.askHold}>
            <div
              onClick={async () => {
                setSelectedElement(undefined);
                // mutateKichir(deleteKichir, {
                //   optimisticData: () =>
                //     allKichir.filter(
                //       (kichir) => kichir.id !== selectedElement.id
                //     ),
                //   populateCache: () =>
                //     allKichir.filter(
                //       (kichir) => kichir.id !== selectedElement.id
                //     ),
                //   revalidate: false,
                // });
                function deleteKichir() {
                  return fetch(`/api/deletekichir?id=${selectedElement?.id}`, {
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
  );
}
