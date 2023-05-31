"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import Modal from "./comps/dls/Modal";
import styles from "./isLoggedIn.module.css";

export default function Isloggedin() {
  const [isModelOpen, setisModelOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  const dialogRef = useRef<HTMLDialogElement>(null);

  if (session) {
    return (
      <>
        <button
          className={styles.loggedName}
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          {session.user?.name ? session.user?.name?.split(" ")[0] : "Logout"}
        </button>

        <dialog
          className={styles.dialog}
          ref={dialogRef}
          onClick={(e) => {
            const dialogDimensions = dialogRef.current!.getBoundingClientRect();
            if (
              e.clientX < dialogDimensions.left ||
              e.clientX > dialogDimensions.right ||
              e.clientY < dialogDimensions.top ||
              e.clientY > dialogDimensions.bottom
            ) {
              dialogRef.current!.close();
            }
          }}
        >
          <h2> Do want to Logout? </h2>
          <div className={styles.askHold}>
            <div
              onClick={() => {
                signOut();
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
        </dialog>
      </>
    );
  } else
    return (
      <button className={styles.btn} onClick={() => signIn("google")}>
        Sign in
      </button>
    );
}
