import React from "react";
import styles from "./HeaderH2.module.css";

export default function HeaderH2({ children }: { children: React.ReactNode }) {
  return <div className={styles.h2}> {children} </div>;
}
