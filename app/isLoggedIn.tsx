"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Modal from "./comps/dls/Modal";
import styles from "./isLoggedIn.module.css";

export default function Isloggedin() {
  const [isModelOpen, setisModelOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          className={styles.loggedName}
          onClick={() => setisModelOpen(true)}
        >
          {session.user?.name ? session.user?.name?.split(" ")[0] : "Logout"}
        </button>

        {isModelOpen && (
          <Modal cssStyles={styles.customModal} setModel={setisModelOpen}>
            <h2> Do want to Logout? </h2>
            <div className={styles.askHold}>
              <div
                onClick={() => {
                  signOut();
                  setisModelOpen(false);
                }}
              >
                Yes
              </div>
              <div
                onClick={() => {
                  setisModelOpen(false);
                }}
              >
                No
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  } else
    return (
      <button className={styles.btn} onClick={() => signIn("google")}>
        Sign in
      </button>
    );
}
