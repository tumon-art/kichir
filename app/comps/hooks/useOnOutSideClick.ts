import { useEffect } from "react";

export default function useOnOutSideClick<T extends Element | null>(
  ref: React.RefObject<T | null>,
  callback: () => void
) {
  useEffect(() => {
    const listener = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback]);
}
