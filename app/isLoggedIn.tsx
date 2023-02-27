"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Modal from "./comps/modal";
import styles from "./isLoggedIn.module.css";

export default function Isloggedin() {
  const [isModelOpen, setisModelOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  if (session) {
    console.log(session);
    return (
      <>
        <button
          className={styles.loggedName}
          onClick={() => setisModelOpen(true)}
        >
          {session.user?.name?.split(" ")[0]}
        </button>
        <Modal
          isOpen={isModelOpen}
          cssStyles={styles.customModal}
          setModel={setisModelOpen}
        >
          <h2> Do want to Logout? </h2>
        </Modal>
      </>
    );
  } else
    return (
      <button className={styles.btn} onClick={() => signIn()}>
        Sign in
      </button>
    );
}
