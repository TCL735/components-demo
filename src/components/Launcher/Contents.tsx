import React, { FC, forwardRef, useContext, useMemo } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { GroupName } from "../types";
import { sections } from "../../data";
import { GroupsContext, SectionsContext } from "../../utils/hooks";
import "./Contents.css";

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
      <Typography variant="h6" className="group-name">
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
                className="section-button-shortcut"
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

export const Contents = forwardRef(
  (props: { selectedGroup: GroupName }, ref) => {
    const { selectedGroup } = props;
    const groups = useContext(GroupsContext);
    const filteredGroups = groups.filter((group) => {
      if (selectedGroup === GroupName.All) {
        return true;
      }
      return selectedGroup === group.name;
    });

    return (
      <Box className="contents" mx={10} my={5} ref={ref}>
        <Grid container rowSpacing={2} className="content-body">
          <SectionsContext.Provider value={sections}>
            {filteredGroups.map((group) => (
              <ContentGroup key={group.name} groupName={group.name} />
            ))}
          </SectionsContext.Provider>
        </Grid>
      </Box>
    );
  },
);
