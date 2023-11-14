import React from "react";
import { Popper, Paper, Grow, List, ListItem, ClickAwayListener } from "@mui/material";

const FolderMenu = ({ isFolderDropdownOpen, folderIconAnchorEl, onClose }) => {
  return (
    <Popper
      open={isFolderDropdownOpen}
      anchorEl={folderIconAnchorEl}
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
                {/* List of folders */}
                <ListItem button>Folder 1</ListItem>
                <ListItem button>Folder 2</ListItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default FolderMenu;

