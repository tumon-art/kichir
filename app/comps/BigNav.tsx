"use client";
import { signOut, useSession } from "next-auth/react";
import styles from "./BigNav.module.css";
import {
  Bookmarks,
  Followers,
  HashTag,
  Home,
  Notification,
  Profile,
  Telegram,
} from "./Icons";
import Card from "./dls/Card";
import Image from "next/image";
import Link from "next/link";
import defaultImg from "@/lib/tools/deaultImg";
import { useRef } from "react";
import { DialogModalWrapper } from "./dls/DialogModalWrapper";

export default function BigNav() {
  const { data: session } = useSession();

  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <aside className={styles.main}>
      <Card py07em>
        <Link href="/">
          <div className={styles.IconNTexthold}>
            <Home cssStyles={styles.homeSvg} />{" "}
            <span className={styles.text}> Home </span>
          </div>
        </Link>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Followers cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Followers </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Bookmarks cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Bookmarks </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Profile cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Profile </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <HashTag cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Explore </span>
        </div>
      </Card>

      <Card py07em>
        <div className={styles.IconNTexthold}>
          <Notification cssStyles={styles.homeSvg} />{" "}
          <span className={styles.text}> Notices </span>
        </div>
      </Card>

      <button className={styles.kichirBtn}>Kichir</button>
      <DialogModalWrapper
        dialogRef={dialogRef}
        preDialogContent={
          <Card py07em>
            <div className={styles.profileHold}>
              <Image
                src={String(session?.user?.image || defaultImg)}
                alt="img"
                width="40"
                height="40"
                className={styles.img}
              />

              <span> {session?.user?.name} </span>
            </div>
          </Card>
        }
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
      </DialogModalWrapper>

      <div className={styles.noticeBoard}>
        <h3> Notice </h3>

        <div className={styles.divP}>
          I stoped adding features. Contact me if you need full source code.
          <br></br>
          <div className={styles.pFooter}>
            <Telegram cssStyles={styles.tgSVG} />
            <a className={styles.a} href="https://t.me/tumon_001">
              t.me/tumon_001
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

import React from "react";

/**
 * Props for the DialogModalNew component.
 */
interface DialogModalProps {
  /** Function to call when the modal should be closed. */
  onClose: (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;

  /** Content to be displayed within the modal. */
  children: React.ReactNode;

  /** Reference to the modal dialog element. */
  dialogRef: React.RefObject<HTMLDialogElement>;
}

/**
 * Component to display a modal dialog.
 *
 * @param {DialogModalProps} props - The component props.
 * @returns {JSX.Element} The DialogModalNew component.
 */
export function DialogModalNew({
  dialogRef,
  children,
  onClose,
}: DialogModalProps): JSX.Element {
  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog} // Remember to define styles
      onClick={(e) => onClose(e)}
    >
      {children}
    </dialog>
  );
}
