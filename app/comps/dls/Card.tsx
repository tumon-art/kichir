import React from "react";
import styles from "./Card.module.css";

/**
 * Card
 * @param {boolean} py07em -  margin: 0.7em 0;
 */

export default function Card({
  children,
  py07em,
}: {
  children: React.ReactNode;
  py07em?: boolean;
}) {
  return (
    <div className={`${styles.main} ${py07em && styles.py07em}`}>
      {children}
    </div>
  );
}
