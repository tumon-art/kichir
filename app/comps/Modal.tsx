import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setModel: (arg1: boolean) => void;
  cssStyles?: string;
}

export default function Modal({
  children,
  isOpen,
  setModel,
  cssStyles,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <section className={styles.modalMain}>
      <div onClick={() => setModel(false)} className={styles.Xdiv}></div>
      <div className={`${styles.modalBody} ${cssStyles}`}>{children}</div>
    </section>
  );
}
