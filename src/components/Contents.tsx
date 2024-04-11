import React, { FC, forwardRef, useContext, useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { IconSearch, IconArrowsRightLeft } from "@tabler/icons-react";
import { GroupName, Group, IconColor } from "./types";
import { sections } from "../data";
import "./Contents.css";
import { GroupsContext, SectionsContext } from "../utils/hooks";

interface ContentNavigationProps {
  groups: Array<Group>;
  selectedGroup: GroupName;
  setSelectedGroup: React.Dispatch<React.SetStateAction<GroupName>>;
}

export const ContentNavigation: FC<ContentNavigationProps> = ({
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

interface ContentGroupProps {
  groupName: GroupName;
}
export const ContentGroup: FC<ContentGroupProps> = ({ groupName }) => {
  const sections = useContext(SectionsContext);
  const sectionRows = useMemo(
    () => sections.filter((section) => section.group === groupName),
    [groupName, sections],
  );

  return (
    <Grid item xs={12}>
      <Typography variant="h6" id="group-name">
        {groupName}
      </Typography>
      <Box>
        {sectionRows.map((section) => {
          const Icon = section.icon;
          return (
            <Box key={section.name} className="section-row">
              <Box
                className="section-icon-container"
                style={{ backgroundColor: section.iconColor }}
              >
                <Icon />
              </Box>
              <Typography variant="h6" className="section-name">
                {section.name}
              </Typography>
              <Typography className="section-description">
                {section.description}
              </Typography>
              <Button
                variant="outlined"
                id="section-button-shortcut"
                size="small"
              >
                <span>{section.shortcut}</span>
              </Button>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
};

export const Contents = forwardRef((_, ref) => {
  const [selectedGroup, setSelectedGroup] = useState(GroupName.All);

  const groups = useContext(GroupsContext);
  const filteredGroups = groups.filter((group) => {
    if (selectedGroup === GroupName.All) {
      return true;
    }
    return selectedGroup === group.name;
  });

  return (
    <Box id="contents" mx={10} my={5} ref={ref}>
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
                  <Button id="button-command-e" variant="outlined" size="large">
                    <span>'/' for commands</span>
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <ContentNavigation
          groups={groups}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </Box>

      <Grid container rowSpacing={2} className="content-body">
        <SectionsContext.Provider value={sections}>
          {filteredGroups.map((group) => (
            <ContentGroup key={group.name} groupName={group.name} />
          ))}
        </SectionsContext.Provider>
      </Grid>
    </Box>
  );
});
