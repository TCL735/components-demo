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
import { IconSearch } from "@tabler/icons-react";
import { GroupName, groups, sections } from "./Sections";
import "./Contents.css";

interface ContenGroupProps {
  groupName: GroupName;
}
export const ContentGroup: FC<ContenGroupProps> = ({ groupName }) => {
  const sectionRows = useMemo(
    () => sections.filter((section) => section.group === groupName),
    [groupName],
  );

  return (
    <Grid item xs={12}>
      <Typography variant="h6" id="group-name">
        {groupName}
      </Typography>
      <Stack>
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
      </Stack>
    </Grid>
  );
};

export const Contents = forwardRef((props, ref) => {
  return (
    <Box id="contents" mx={10} my={5} ref={ref}>
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

      <Grid container rowSpacing={2}>
        {groups.map((group) => (
          <ContentGroup key={group.name} groupName={group.name} />
        ))}
      </Grid>
    </Box>
  );
});
