"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "../Icons";
import styles from "./DarkModeToggle.module.css";

const DarkModeToggle = () => {
  const [islightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const storedLightMode = localStorage.getItem("lightMode");
    document.documentElement.classList.toggle(
      "lightMode",
      storedLightMode === "true"
    );
    setIsLightMode(storedLightMode === "true");
  }, []);

  const toggleDarkMode = () => {
    const updatedLightMode = !islightMode;
    setIsLightMode(updatedLightMode);
    localStorage.setItem("lightMode", updatedLightMode.toString()); // Convert to string
    document.documentElement.classList.toggle("lightMode", updatedLightMode);
  };

  return (
    <div className={styles.main} onClick={toggleDarkMode}>
      {islightMode ? (
        <Moon cssStyles={styles.SVG} />
      ) : (
        <Sun cssStyles={styles.SVG} />
      )}
    </div>
  );
};

export default DarkModeToggle;
