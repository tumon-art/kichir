import React, { useRef } from "react";
import { DialogModalNew } from "../DialogModalNew";

interface DialogModalWrapperProps {
  preDialogContent: React.ReactNode;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement>;
  defaultTrigger: boolean;
  customTrigger?: () => void;
}

/**
 * Wrapper component to handle triggering a modal dialog.
 * Renders a triggering element and positions the modal relative to it.
 *
 * @param {DialogModalWrapperProps} props - The component props.
 * @returns {JSX.Element} The DialogModalWrapper component.
 */
export function DialogModalWrapper({
  preDialogContent,
  children,
  modalRef,
  defaultTrigger,
  customTrigger
}: DialogModalWrapperProps): JSX.Element {
  // Ref to the element triggering the modal
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Clickable area to trigger the modal */}
      <div
        ref={parentRef}
        onClick={() => {

          if (defaultTrigger) {
            console.log("defaultTrigger")
            modalRef.current?.showModal();

            // Calculate and set modal position
            if (modalRef.current) {
              const dialogDimensions = modalRef.current.getBoundingClientRect();
              modalRef.current.style.top = `${parentRef.current!.getBoundingClientRect().top -
                dialogDimensions.height -
                10
                }px`;
              modalRef.current.style.left = `${parentRef.current!.getBoundingClientRect().width / 2 +
                parentRef.current!.getBoundingClientRect().left -
                dialogDimensions.width / 2
                }px`;
            }
          }

          if (customTrigger) {
            console.log("customTrigger")
            customTrigger()

            // Calculate and set modal position
            if (modalRef.current) {
              const dialogDimensions = modalRef.current.getBoundingClientRect();
              modalRef.current.style.top = `${parentRef.current!.getBoundingClientRect().top -
                dialogDimensions.height -
                10
                }px`;
              modalRef.current.style.left = `${parentRef.current!.getBoundingClientRect().width / 2 +
                parentRef.current!.getBoundingClientRect().left -
                dialogDimensions.width / 2
                }px`;
            }
          }
        }}
      >
        {preDialogContent}
      </div>

      {/* Actual modal content */}
      <DialogModalNew
        onClose={(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
          if (modalRef.current) {
            const dialogDimensions = modalRef.current.getBoundingClientRect();

            // Close modal if clicked outside of it
            if (
              e.clientX < dialogDimensions.left ||
              e.clientX > dialogDimensions.right ||
              e.clientY < dialogDimensions.top ||
              e.clientY > dialogDimensions.bottom
            ) {
              modalRef.current.close();
              document.documentElement.style.overflow = "auto";
            }
          }
        }}
        modalRef={modalRef}
      >
        {children}
      </DialogModalNew>
    </>
  );
}
