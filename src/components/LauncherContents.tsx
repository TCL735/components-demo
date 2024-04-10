import React, { FC, forwardRef, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GroupName, groups, sections } from "./Sections";

interface ContenGroupProps {
  groupName: GroupName;
}
export const ContentGroup: FC<ContenGroupProps> = ({ groupName }) => {
  const sectionRows = useMemo(
    () => sections.filter((section) => section.group === groupName),
    [groupName],
  );

  return (
    <Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{groupName}</Typography>
        <Stack>
          {sectionRows.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.name}>
                <Icon />
                <span>{section.name}</span>
                <span>{section.description}</span>
              </div>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
};

export const LauncherContents = forwardRef((props, ref) => {
  return (
    <Box mx={10} my={5} ref={ref}>
      <TextField
        autoFocus
        fullWidth
        placeholder="Search for anything"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                className="button-command-e"
                variant="outlined"
                size="large"
              >
                <span>'/' for commands</span>
              </Button>
            </InputAdornment>
          ),
        }}
      />
      {groups.map((group) => (
        <ContentGroup key={group.name} groupName={group.name} />
      ))}
    </Box>
  );
});
