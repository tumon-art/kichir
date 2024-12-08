const DialogModal = ({
  dialogRef,
  children,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
}) => {
  console.log("Dialog Modal");
  return (
    <dialog
      className="dialog"
      ref={dialogRef}
      onClick={(e) => {
        const dialogDimensions = dialogRef.current!.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialogRef.current!.close();
        }
      }}
    >
      {children}
    </dialog>
  );
};

export default DialogModal;
