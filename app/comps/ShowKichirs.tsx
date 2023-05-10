"use client";
import Container from "./dls/Container";
import styles from "./ShowKichirs.module.css";
import useSWR, { KeyedMutator, preload } from "swr";
import Spinner from "./dls/Spinner";
import { Comment as commnets, Kichir, Love as loves } from "@prisma/client";
import Image from "next/image";
import dayjs from "../../lib/tools/dayjsConfig";
import { CommentIcon, Ellipsis, Love, View, XMark } from "./Icons";
import Modal from "./dls/Modal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ImageModal from "./dls/ImageModal";
import Link from "next/link";
import randomInt from "@/lib/tools/randomInt";
import defaultImg from "@/lib/tools/deaultImg";

export const fetcherGET = (url: string) => fetch(url).then((r) => r.json());

export interface AllKichris extends Kichir {
  loves: loves[];
  comments: commnets[];
  author: {
    name: string | null;
    image: string | null;
    uname: string | null;
  };
}

export default function ShowKichirs() {
  const { data, error, isLoading, mutate } = useSWR<
    (Kichir & {
      loves: loves[];
      comments: commnets[];
      author: {
        name: string | null;
        image: string | null;
        uname: string | null;
      };
    })[]
  >("/api/getkichirs", fetcherGET);

  useEffect(() => {
    setTimeout(() => {
      data?.map((each: Kichir) => {
        preload(`/api/getkichirs?id=${each.id}`, fetcherGET);
      });
    }, 3000);
  }, []);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <Container px1em mt3em>
        <div className={styles.loadingDiv}>
          <Spinner />
        </div>
      </Container>
    );

  return (
    <section>
      {data?.map((e) => (
        <KichirComp
          key={e.id}
          kichir={e}
          allKichir={data}
          mutateKichir={mutate}
        />
      ))}
    </section>
  );
}

// KICHIR COMP
const KichirComp = ({
  kichir,
  mutateKichir,
  allKichir,
}: {
  kichir: AllKichris;

  mutateKichir: KeyedMutator<AllKichris[]>;
  allKichir: AllKichris[];
}) => {
  const { data: session } = useSession();
  const [selectedElement, setSelectedElement] = useState<AllKichris>();
  const [imageModal, setImageModal] = useState<string>();
  const [isLiked, setisLiked] = useState<boolean>();

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
        mutateKichir();
      })
      .catch((err) => console.log(err));
  };

  console.log("KichirComp");
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

          <Link passHref href={`/kichir/${kichir.id}`}>
            {/* --- CARD BODY TEXT */}
            <div className={styles.bodyText}>{kichir.body}</div>
          </Link>
          {/* --- CARD IMAGE */}
          {kichir.img && (
            <div className={styles.kichirImageHold}>
              <a>
                <Image
                  src={kichir.img}
                  height="360"
                  width="440"
                  alt="Image"
                  className={styles.kichirImage}
                  onClick={() => setImageModal(kichir.img!)}
                />
              </a>
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
              <span> {kichir.comments.length} </span>
            </div>
            <div className={styles.iconHold}>
              <View cssStyles={styles.ViewIcon} />
              <span> {randomInt(50, 200)} </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- DELETE KICHIR MODAL */}
      {selectedElement ? (
        <Modal cssStyles={styles.customModal} setModel={setSelectedElement}>
          <h2> Wanna Delete This Kichir? </h2>
          <div className={styles.askHold}>
            <div
              onClick={async () => {
                setSelectedElement(undefined);
                mutateKichir(deleteKichir, {
                  optimisticData: () =>
                    allKichir.filter(
                      (kichir) => kichir.id !== selectedElement.id
                    ),
                  populateCache: () =>
                    allKichir.filter(
                      (kichir) => kichir.id !== selectedElement.id
                    ),
                  revalidate: false,
                });
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
};
