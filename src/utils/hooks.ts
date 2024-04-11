import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { Group, Section } from "../components/types";
import { groups, sections } from "../data";

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

export const GroupsContext = createContext<Array<Group>>(groups);
export const SectionsContext = createContext<Array<Section>>(sections);
