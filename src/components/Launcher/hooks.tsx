import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { Group, GroupName, Mode, Section } from "../types";
import { commands, groups, sections } from "../../data";

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
export const CommandsContext = createContext<Array<Section>>(commands);
export const DataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GroupsContext.Provider value={groups}>
      <SectionsContext.Provider value={sections}>
        <CommandsContext.Provider value={commands}>
          {children}
        </CommandsContext.Provider>
      </SectionsContext.Provider>
    </GroupsContext.Provider>
  );
};

type State = {
  isLauncherOpen: boolean;
  selectedGroup: GroupName;
  searchTerm: string;
  mode: Mode;
  groups: Array<Group>;
  sections: Array<Section>;
};

export const CLOSE_LAUNCHER = "close launcher";
export const OPEN_LAUNCHER = "open launcher";
export const TOGGLE_LAUNCHER = "toggle launcher";
export const SET_SEARCH_TERM = "set search term";
export const SET_SELECTED_GROUP = "set selected group";
export const SET_MODE = "set mode";

export type Action =
  | { type: typeof CLOSE_LAUNCHER }
  | { type: typeof OPEN_LAUNCHER }
  | { type: typeof TOGGLE_LAUNCHER }
  | { type: typeof SET_SEARCH_TERM; searchTerm: string }
  | { type: typeof SET_SELECTED_GROUP; selectedGroup: GroupName }
  | { type: typeof SET_MODE; mode: Mode };

export const INITIAL_STATE: State = {
  isLauncherOpen: false,
  selectedGroup: GroupName.All,
  searchTerm: "",
  groups,
  sections,
  mode: Mode.Main,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case CLOSE_LAUNCHER: {
      return {
        ...state,
        isLauncherOpen: false,
      };
    }
    case OPEN_LAUNCHER: {
      return {
        ...state,
        isLauncherOpen: true,
      };
    }
    case TOGGLE_LAUNCHER: {
      return {
        ...state,
        isLauncherOpen: !state.isLauncherOpen,
      };
    }
    case SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    case SET_SELECTED_GROUP: {
      return {
        ...state,
        selectedGroup: action.selectedGroup,
      };
    }
    case SET_MODE: {
      return {
        ...state,
        mode: action.mode,
      };
    }
    default:
      throw new Error("Unknown action type");
  }
};

export const StateContext = createContext(INITIAL_STATE);
export const ActionContext = createContext<React.Dispatch<Action>>(() => {});
