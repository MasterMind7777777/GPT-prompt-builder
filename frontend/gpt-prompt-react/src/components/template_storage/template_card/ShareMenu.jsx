import React, { useState } from "react";
import {
  Popper,
  Paper,
  Grow,
  List,
  ListItem,
  ClickAwayListener,
} from "@mui/material";

const ShareMenu = ({ isShareMenuOpen, shareIconAnchorEl, onClose, onMenuItemClick }) => {
  return (
    <Popper
      open={isShareMenuOpen}
      anchorEl={shareIconAnchorEl}
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
                <ListItem button onClick={onMenuItemClick}>
                  Copy Link
                </ListItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default ShareMenu;

