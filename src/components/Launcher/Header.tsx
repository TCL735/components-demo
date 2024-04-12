import React, { FC, useCallback, useContext } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { IconSearch, IconArrowsRightLeft } from "@tabler/icons-react";
import { GroupName, Group, IconColor } from "../types";
import { ActionContext, GroupsContext, SET_SELECTED_GROUP } from "./hooks";
import "./Header.css";

interface HeaderProps {
  selectedGroup: GroupName;
}

interface NavigationProps extends HeaderProps {
  groups: Array<Group>;
}

export const Navigation: FC<NavigationProps> = ({ groups, selectedGroup }) => {
  const dispatch = useContext(ActionContext);

  const handleButtonTab = () => {
    const currentIndex = groups.findIndex(
      (group) => group.name === selectedGroup,
    );
    if (currentIndex === groups.length - 1) {
      dispatch({ type: SET_SELECTED_GROUP, selectedGroup: GroupName.All });
    } else {
      dispatch({
        type: SET_SELECTED_GROUP,
        selectedGroup: groups[currentIndex + 1].name,
      });
    }
  };

  const handleClickAll = useCallback(
    () => dispatch({ type: SET_SELECTED_GROUP, selectedGroup: GroupName.All }),
    [dispatch],
  );
  return (
    <Box className="navigation-bar">
      <Button
        className="navigation-button"
        sx={{
          backgroundColor: selectedGroup === GroupName.All ? IconColor.All : "",
        }}
        onClick={handleClickAll}
      >
        All
      </Button>
      {groups.map((group) => {
        const { icon: NavIcon } = group;
        return (
          <Button
            key={group.name}
            className="navigation-button"
            sx={
              selectedGroup === group.name
                ? {
                    backgroundColor: IconColor[group.name],
                    color: "#ffffff !important",
                  }
                : null
            }
            onClick={() =>
              dispatch({ type: SET_SELECTED_GROUP, selectedGroup: group.name })
            }
          >
            <NavIcon />
            {group.name}
          </Button>
        );
      })}
      <Button className="navigation-tab-button" onClick={handleButtonTab}>
        <IconArrowsRightLeft />
        tabs
      </Button>
    </Box>
  );
};

export const Header: FC<HeaderProps> = ({ selectedGroup }) => {
  const groups = useContext(GroupsContext);

  return (
    <Box className="header">
      <Box className="contents-search">
        <TextField
          className="textfield-search"
          autoFocus
          fullWidth
          placeholder="Find info, Ask questions or Run queries"
          InputProps={{
            className: "textfield-search-input",
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  className="button-command-slash"
                  variant="outlined"
                  size="large"
                >
                  <span>'/' for commands</span>
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Navigation groups={groups} selectedGroup={selectedGroup} />
    </Box>
  );
};
