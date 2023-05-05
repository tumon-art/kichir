import styles from "./ImageModal.module.css";

export default function ImageModal({
  children,
  setImageModel,
  cssStyles,
}: {
  children: React.ReactNode;
  setImageModel: (arg1: any) => void;
  cssStyles?: string;
}) {
  console.log("image modal");
  return (
    <section className={styles.modalMain}>
      <div onClick={() => setImageModel(false)} className={styles.Xdiv}></div>
      <div className={`${styles.modalBody} ${cssStyles}`}>{children}</div>
    </section>
  );
}
