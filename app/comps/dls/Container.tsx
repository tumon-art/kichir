import React from "react";
import styles from "./Container.module.css";

/**
 * Container with Fixed max-width & margin
 * @param {boolean} px1em - padding: 0 1em;
 * @param {boolean} mt3em - margin: 3em 0 0 0;
 * @param {boolean} bX1px - borderX: 1px solid var(--primary);
 * @param {boolean} bB1px - border-bottom: 1px dotted var(--primary);
 */

export default function Container({
  children,
  px1em,
  mt3em,
  bX1px,
  bB1px,
}: {
  children: React.ReactNode;
  px1em?: boolean;
  mt3em?: boolean;
  bX1px?: boolean;
  bB1px?: boolean;
}) {
  return (
    <div
      className={`${styles.main} ${px1em && styles.px1em} ${
        mt3em && styles.mt3em
      } ${bX1px && styles.bX1px} ${bB1px && styles.bB1px}`}
    >
      {children}
    </div>
  );
}
