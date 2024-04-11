import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from "@mui/material";
import { IconLayoutGrid } from "@tabler/icons-react";
import { Contents } from "./Contents";
import { groups } from "./Sections";
import { useKeyPress, GroupsContext } from "../utils/hooks";
import "./Launcher.css";

export function Launcher() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useKeyPress(["e"], (event) => {
    setIsOpen(true);
  });

  const handleClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {!isOpen ? (
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
      <Dialog
        className="modal"
        fullWidth
        maxWidth="lg"
        open={isOpen}
        onClose={handleClose}
        aria-modal="true"
        aria-labelledby="modal-title-stuff"
        aria-describedby="modal-description"
      >
        <DialogContent id="modal-content">
          <GroupsContext.Provider value={groups}>
            <Contents />
          </GroupsContext.Provider>
        </DialogContent>
      </Dialog>
    </>
  );
}
