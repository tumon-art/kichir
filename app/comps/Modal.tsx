import styles from "./Modal.module.css";

/**
 * Modal Component
 * @param {React.ReactNode} children - takes children
 * @param {boolean} isOpen - to show the comp
 * @param {(arg:boolean)=>} setModel - show/hide function;
 * @param {string} cssStyles - takes css class;
 */

export default function Modal({
  children,
  isOpen,
  setModel,
  cssStyles,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setModel: (arg1: boolean) => void;
  cssStyles?: string;
}) {
  if (!isOpen) return null;

  return (
    <section className={styles.modalMain}>
      <div onClick={() => setModel(false)} className={styles.Xdiv}></div>
      <div className={`${styles.modalBody} ${cssStyles}`}>{children}</div>
    </section>
  );
}
