import React from "react";
import styles from "./Container.module.css";

/**
 * Container with Fixed max-width & margin
 * @param {boolean} px1em - padding: 0 1em;
 * @param {boolean} mt3em - margin: 3em 0 0 0;
 */

export default function Container({
  children,
  px1em,
  mt3em,
}: {
  children: React.ReactNode;
  px1em?: boolean;
  mt3em?: boolean;
}) {
  return (
    <div
      className={`${styles.main} ${px1em && styles.px1em} ${
        mt3em && styles.mt3em
      }`}
    >
      {children}
    </div>
  );
}
