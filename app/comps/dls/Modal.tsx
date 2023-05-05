import styles from "./Modal.module.css";

/**
 * Modal Component
 * @param {React.ReactNode} children - takes children
 * @param {(arg:boolean)=>} setModel - show/hide function;
 * @param {string} cssStyles - takes css class;
 */

export default function Modal({
  children,
  setModel,
  cssStyles,
}: {
  children: React.ReactNode;
  setModel: (arg1: any) => void;
  cssStyles?: string;
}) {
  console.log("modal");
  return (
    <section className={styles.modalMain}>
      <div onClick={() => setModel(false)} className={styles.Xdiv}></div>
      <div className={`${styles.modalBody} ${cssStyles}`}>{children}</div>
    </section>
  );
}
