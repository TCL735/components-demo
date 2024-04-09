import React, { useState } from "react";
import { Box, Button, InputAdornment, Modal, TextField } from "@mui/material";
import { useKeyPress } from "../utils/hooks";
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
                <Button variant="outlined">⌘E</Button>
              </InputAdornment>
            ),
          }}
        />
      ) : null}
      <Modal open={isOpen} onClose={handleClose}>
        <Box mx={20} my={10} className="modal">
          <div>hello</div>
        </Box>
      </Modal>
    </>
  );
}
