import React, { ReactNode, useCallback, useContext, useReducer } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from "@mui/material";
import { IconLayoutGrid } from "@tabler/icons-react";
import { groups, sections } from "../../data";
import {
  ActionContext,
  CLOSE_LAUNCHER,
  GroupsContext,
  INITIAL_STATE,
  OPEN_LAUNCHER,
  SectionsContext,
  StateContext,
  reducer,
  useKeyPress,
} from "./hooks";
import { Contents } from "./Contents";
import { Header } from "./Header";
import "./Launcher.css";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GroupsContext.Provider value={groups}>
      <SectionsContext.Provider value={sections}>
        {children}
      </SectionsContext.Provider>
    </GroupsContext.Provider>
  );
};

export function Launcher() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { isLauncherOpen, selectedGroup } = state;

  useKeyPress(["e"], (event) => {
    dispatch({ type: OPEN_LAUNCHER });
  });

  const handleClick = useCallback(() => {
    dispatch({ type: OPEN_LAUNCHER });
  }, [dispatch]);
  const handleClose = useCallback(
    () => dispatch({ type: CLOSE_LAUNCHER }),
    [dispatch],
  );

  return (
    <>
      {!isLauncherOpen ? (
        <TextField
          fullWidth
          onClick={handleClick}
          placeholder="Search for anything"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  className="button-command-e"
                  variant="outlined"
                  size="large"
                >
                  <IconLayoutGrid />
                  <span>⌘E</span>
                </Button>
              </InputAdornment>
            ),
          }}
        />
      ) : null}
      <DataProvider>
        <ActionContext.Provider value={dispatch}>
          <StateContext.Provider value={state}>
            <Dialog
              className="modal"
              fullWidth
              maxWidth="lg"
              open={isLauncherOpen}
              onClose={handleClose}
              aria-modal="true"
              aria-labelledby="modal-title-stuff"
              aria-describedby="modal-description"
            >
              <Header selectedGroup={selectedGroup} />
              <DialogContent className="modal-content">
                <Contents selectedGroup={selectedGroup} />
              </DialogContent>
            </Dialog>
          </StateContext.Provider>
        </ActionContext.Provider>
      </DataProvider>
    </>
  );
}
