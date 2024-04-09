import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useKeyPress = (
  keys: string[],
  callback: (e: KeyboardEvent) => void,
) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (
        keys.some(
          (key) => event.key === key && (event.ctrlKey || event.metaKey),
        )
      ) {
        callbackRef.current(event);
      }
    },
    [keys],
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // clean up the event listener
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};
