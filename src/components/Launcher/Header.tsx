import React, { FC, useCallback, useContext } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { IconSearch, IconArrowsRightLeft } from "@tabler/icons-react";
import { GroupName, Group, IconColor, Mode } from "../types";
import {
  ActionContext,
  GroupsContext,
  SET_MODE,
  SET_SEARCH_TERM,
  SET_SELECTED_GROUP,
  StateContext,
} from "./hooks";
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

interface SearchBarButtonProps {
  type: Mode;
}
export const SearchBarButton: FC<SearchBarButtonProps> = ({ type }) => {
  if (type === Mode.Command) {
    return (
      <Button className="search-bar-button" variant="outlined" size="large">
        <span>↩ Run Command</span>
      </Button>
    );
  }
  return (
    <Button className="search-bar-button" variant="outlined" size="large">
      <span>'/' for commands</span>
    </Button>
  );
};

export const Header: FC<HeaderProps> = ({ selectedGroup }) => {
  const groups = useContext(GroupsContext);
  const dispatch = useContext(ActionContext);
  const { mode } = useContext(StateContext);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.startsWith("/")) {
      dispatch({ type: SET_MODE, mode: Mode.Command });
    } else if (mode === Mode.Command) {
      dispatch({ type: SET_MODE, mode: Mode.Main });
    }
    dispatch({ type: SET_SEARCH_TERM, searchTerm });
  };

  return (
    <Box className="header">
      <Box className="contents-search">
        <TextField
          className="textfield-search"
          autoFocus
          fullWidth
          placeholder="Find info, Ask questions or Run queries"
          onChange={handleChange}
          InputProps={{
            className: "textfield-search-input",
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SearchBarButton type={mode} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {mode === Mode.Main && (
        <Navigation groups={groups} selectedGroup={selectedGroup} />
      )}
    </Box>
  );
};
