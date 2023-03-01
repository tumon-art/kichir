import React from "react";
import styles from "./Container.module.css";

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
