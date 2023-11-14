import React from "react";
import { Popper, Paper, Grow, List, ListItem, ClickAwayListener } from "@mui/material";

const TagMenu = ({ isTagDropdownOpen, tagIconAnchorEl, onClose }) => {
  return (
    <Popper
      open={isTagDropdownOpen}
      anchorEl={tagIconAnchorEl}
      placement="right-start"
      transition
      disablePortal
      modifiers={{
        flip: {
          enabled: true,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: "scrollParent",
        },
      }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <List>
                {/* List of tags */}
                <ListItem button>Tag 1</ListItem>
                <ListItem button>Tag 2</ListItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default TagMenu;

