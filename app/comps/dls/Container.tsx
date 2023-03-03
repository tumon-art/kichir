import React from "react";
import styles from "./Container.module.css";

/**
 * Container with Fixed max-width & margin
 * @param {boolean} px1em - padding: 0 1em;
 */

export default function Container({
  children,
  px1em,
}: {
  children: React.ReactNode;
  px1em?: boolean;
}) {
  return (
    <div className={`${styles.main} ${px1em && styles.px1em}`}>{children}</div>
  );
}
