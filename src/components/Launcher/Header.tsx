import React, { FC, useContext } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { IconSearch, IconArrowsRightLeft } from "@tabler/icons-react";
import { GroupName, Group, IconColor } from "../types";
import { GroupsContext } from "../../utils/hooks";
import "./Header.css";

interface HeaderProps {
  selectedGroup: GroupName;
  setSelectedGroup: React.Dispatch<React.SetStateAction<GroupName>>;
}

interface NavigationProps extends HeaderProps {
  groups: Array<Group>;
}

export const Navigation: FC<NavigationProps> = ({
  groups,
  selectedGroup,
  setSelectedGroup,
}) => {
  const handleButtonTab = () => {
    const currentIndex = groups.findIndex(
      (group) => group.name === selectedGroup,
    );
    if (currentIndex === groups.length - 1) {
      setSelectedGroup(GroupName.All);
    } else {
      setSelectedGroup(groups[currentIndex + 1].name);
    }
  };
  return (
    <Box className="navigation-bar">
      <Button
        className="navigation-button"
        sx={{
          backgroundColor: selectedGroup === GroupName.All ? IconColor.All : "",
        }}
        onClick={() => setSelectedGroup(GroupName.All)}
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
            onClick={() => setSelectedGroup(group.name)}
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

export const Header: FC<HeaderProps> = ({
  selectedGroup,
  setSelectedGroup,
}) => {
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
      <Navigation
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
    </Box>
  );
};
