import styles from "./DialogModalNew.module.css"

import type { JSX } from "react";

interface DialogModalProps {
  onClose: (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

/**
 * Component to display a modal dialog.
 *
 * @param {DialogModalProps} props - The component props.
 * @returns {JSX.Element} The DialogModalNew component.
 */
export function DialogModalNew({
  onClose,
  modalRef,
  children,
}: DialogModalProps): JSX.Element {
  return (
    <dialog
      ref={modalRef}
      className={styles.dialog} // Remember to define styles
      onClick={(e) => onClose(e)}
    >
      {children}
    </dialog>
  );
}
