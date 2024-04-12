import React, { FC, forwardRef, useContext, useMemo } from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { GroupName, Mode } from "../types";
import {
  CommandsContext,
  GroupsContext,
  SectionsContext,
  StateContext,
} from "./hooks";
import "./Contents.css";

interface ContentGroupProps {
  groupName: GroupName;
}
export const ContentGroup: FC<ContentGroupProps> = ({ groupName }) => {
  const sections = useContext(SectionsContext);
  const commands = useContext(CommandsContext);
  const { mode } = useContext(StateContext);

  const sectionRows = useMemo(() => {
    if (mode === Mode.Command) {
      return commands.filter((command) => command.group === groupName);
    }
    return sections.filter((section) => section.group === groupName);
  }, [groupName, mode, commands, sections]);

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
                className={`${mode}-icon-container`}
                style={{ backgroundColor: section.iconColor }}
              >
                <Icon />
              </Box>
              <Typography variant="h6" className="section-name">
                {section.name}
              </Typography>
              {section.labels &&
                section.labels.map((label, index) => {
                  const color = index === 0 ? "primary" : "success";
                  return (
                    <Chip
                      className="command-label"
                      label={label}
                      color={color}
                    />
                  );
                })}
              <Typography className="section-description">
                {section.description}
              </Typography>
              {section.shortcut && (
                <Button
                  variant="outlined"
                  className="section-button-shortcut"
                  size="small"
                >
                  <span>{section.shortcut}</span>
                </Button>
              )}
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
    const commands = useContext(CommandsContext);
    const { mode } = useContext(StateContext);

    const commandGroups = new Set<GroupName>();
    if (mode === Mode.Command) {
      commands.forEach((command) => commandGroups.add(command.group));
    }
    const filteredGroupNames =
      mode === Mode.Main
        ? groups
            .filter((group) => {
              if (selectedGroup === GroupName.All) {
                return true;
              }
              return selectedGroup === group.name;
            })
            .map((group) => group.name)
        : Array.from(commandGroups);

    return (
      <Box className="contents" mx={10} my={5} ref={ref}>
        <Grid container rowSpacing={2} className="content-body">
          {filteredGroupNames.map((name) => (
            <ContentGroup key={name} groupName={name} />
          ))}
        </Grid>
      </Box>
    );
  },
);
