import React from "react";
import styles from "./TextLinkSpan.module.css";

export default function TextLinkSpan({
  children,
  textDark,
}: {
  children: React.ReactNode;
  textDark?: boolean;
}) {
  return (
    <span className={`${styles.span} ${textDark && styles.TextDark}`}>
      {children}
    </span>
  );
}
