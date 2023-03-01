import React from "react";
import styles from "./Card.module.css";

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className={styles.main}>{children}</div>;
}
