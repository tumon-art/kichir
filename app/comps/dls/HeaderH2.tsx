import React from "react";
import styles from "./HeaderH2.module.css";

export default function HeaderH2({
  children,
  big,
}: {
  children: React.ReactNode;
  big?: boolean;
}) {
  return (
    <div className={`${styles.h2} ${big && styles.big} `}> {children} </div>
  );
}
