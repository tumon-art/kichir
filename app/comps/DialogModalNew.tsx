import styles from "./DialogModalNew.module.css"
interface DialogModalProps {
  onClose: (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;
  children: React.ReactNode;
  dialogRef: React.RefObject<HTMLDialogElement>;
}

/**
 * Component to display a modal dialog.
 *
 * @param {DialogModalProps} props - The component props.
 * @returns {JSX.Element} The DialogModalNew component.
 */
export function DialogModalNew({
  onClose,
  dialogRef,
  children,
}: DialogModalProps): JSX.Element {
  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog} // Remember to define styles
      onClick={(e) => onClose(e)}
    >
      {children}
    </dialog>
  );
}
