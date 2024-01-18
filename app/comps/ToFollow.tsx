"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import Card from "./dls/Card";
import styles from "./ToFollow.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Modal from "./dls/Modal";
import Container from "./dls/Container";
import Spinner from "./dls/Spinner";

export default function ToFollow({ users }: { users: User[] }) {
  const { data: session } = useSession();
  const [selectedElement, setselectedElement] = useState<User>();

  const { data, isLoading, mutate } = useSWR<User[]>(
    `/api/getfollowing`,
    (url: any) =>
      fetch(url)
        .then((r) => r.json())
        .catch((err) => err)
  );

  const defaultImg =
    "https://previews.123rf.com/images/miketea/miketea1411/miketea141100285/33835661-green-pixel-art-style-pixel-background.jpg";

  if (isLoading)
    return (
      <Container px1em mt3em>
        <div className={styles.loadingDiv}>
          <Spinner />
        </div>
      </Container>
    );

  if (!data) <div> </div>;

  if (!session) return <div> </div>;
  // FOLLOW FUNCTION
  const follow = (followerId: string, followingId: string) =>
    fetch(`api/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerId, followingId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        toast("Followed successfully");
        return response.json();
      })
      .catch((error) => {
        console.error("Error When Follwing :", error);
      });
  // UNFOLLOW FUNCTION
  const unFollow = (followerId: string, followingId: string) =>
    fetch(`api/unfollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerId, followingId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        toast("Unfollowed successfully");
        return response.json();
      })
      .catch((error) => {
        console.error("Error When Follwing :", error);
      });

  // MUTATE WHEN FOLLOW SOMEONE
  const mutateWhenFollow = (user: User) => {
    mutate(follow(String(session?.user?.id), user.id), {
      optimisticData: (currentData) => [...(data || []), user],
      rollbackOnError: true,
      populateCache: (result, currentData) => [...(data || []), user],
      revalidate: true,
    });
  };

  // MUTATE WHEN UNFOLLOW SOMEONE
  const mutateWhenUnfollow = (user: User) => {
    mutate(unFollow(String(session?.user?.id), user.id), {
      optimisticData: (currentData) =>
        data?.filter((eachUser) => eachUser.id !== user.id) || [],
      rollbackOnError: true,
      populateCache: (result, currentData) =>
        data?.filter((eachUser) => eachUser.id !== user.id) || [],
      revalidate: true,
    });
  };

  return (
    <>
      {users?.map((user: User, i) => {
        const match = data?.find((e) => e.id === user.id);
        return (
          <Card py07em key={i}>
            <div className={styles.card}>
              <div className={styles.sect1}>
                <Image
                  src={String(user.image || defaultImg)}
                  alt="userImage"
                  height="40"
                  width="40"
                  className={styles.img}
                />
                <div className={styles.sect2}>
                  <h4 className={styles.name}> {user.name} </h4>
                  <div className={styles.uname}>@{user.uname}</div>
                </div>
              </div>

              <div className={styles.sect3}>
                {/* --- TODO */}
                <div
                  className={`${styles.btn} ${match && styles.btnMatch}`}
                  onClick={() =>
                    match ? setselectedElement(user) : mutateWhenFollow(user)
                  }
                >
                  {match ? "Following" : "Follow"}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
      {/* --- DELETE KICHIR MODAL */}
      {selectedElement ? (
        <Modal cssStyles={styles.customModal} setModel={setselectedElement}>
          <h2> Unfollow {selectedElement.name}? </h2>
          <div className={styles.askHold}>
            <div
              onClick={async () => {
                mutateWhenUnfollow(selectedElement);
                setselectedElement(undefined);
              }}
            >
              Yes
            </div>
            <div
              onClick={() => {
                setselectedElement(undefined);
              }}
            >
              No
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
