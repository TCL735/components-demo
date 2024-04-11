import React, { FC, createRef, forwardRef, useMemo, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { GroupName, Group, sections } from "./Sections";
import "./Contents.css";

interface ContentNavigationProps {
  groups: Array<Group>;
  refs: React.MutableRefObject<any[]>;
}

export const ContentNavigation: FC<ContentNavigationProps> = ({
  groups,
  refs,
}) => {
  const handleClick = (index: number) => {
    refs?.current?.[index]?.current.scrollIntoView();
  };

  return (
    <Box className="navigation-bar">
      <Button className="navigation-button">All</Button>
      {groups.map((group, index) => {
        const Icon = group.icon;
        return (
          <Button
            key={group.name}
            className="navigation-button"
            onClick={() => handleClick(index)}
          >
            <Icon />
            {group.name}
          </Button>
        );
      })}
    </Box>
  );
};

interface ContentGroupProps {
  groupName: GroupName;
}
export const ContentGroup = forwardRef(
  ({ groupName }: ContentGroupProps, ref) => {
    const sectionRows = useMemo(
      () => sections.filter((section) => section.group === groupName),
      [groupName],
    );

    return (
      <Grid item xs={12}>
        <Typography variant="h6" id="group-name">
          {groupName}
        </Typography>
        <Box ref={ref}>
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
  },
);

export const Contents = forwardRef((props: { groups: Array<Group> }, ref) => {
  const { groups } = props;
  const groupRefs = useRef(Array.from(groups, () => createRef()));

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
        <ContentNavigation groups={groups} refs={groupRefs} />
      </Box>

      <Grid container rowSpacing={2} className="content-body">
        {groups.map((group, index) => (
          <ContentGroup
            key={group.name}
            groupName={group.name}
            ref={groupRefs.current?.[index]}
          />
        ))}
      </Grid>
    </Box>
  );
});
