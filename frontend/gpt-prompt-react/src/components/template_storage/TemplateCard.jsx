import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderIcon from "@mui/icons-material/Folder";
import LabelIcon from "@mui/icons-material/Label";
import ShareIcon from "@mui/icons-material/Share";
import ShareMenu from "./template_card/ShareMenu";
import TagMenu from "./template_card/TagMenu";
import FolderMenu from "./template_card/FolderMenu";
import Milestones from "./template_card/Milestones";
import TemplateContent from "./template_card/TemplateContent";

const TemplateCard = ({ title, textContent }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);
  const [tagIconAnchorEl, setTagIconAnchorEl] = useState(null);
  const [folderIconAnchorEl, setFolderIconAnchorEl] = useState(null);
  const [shareIconAnchorEl, setShareIconAnchorEl] = useState(null);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === "Revert") {
      setIsDialogOpen(true);
    }
    handleClose();
  };

  const handleVersionClick = (version) => {
    setSelectedVersion(version);
    setIsDialogOpen(true);
  };

  const handleTagIconClick = (event) => {
    setTagIconAnchorEl(event.currentTarget);
    setIsTagDropdownOpen(!isTagDropdownOpen);
  };

  const handleFolderIconClick = (event) => {
    setFolderIconAnchorEl(event.currentTarget);
    setIsFolderDropdownOpen(!isFolderDropdownOpen);
  };

  const handleShareIconClick = (event) => {
    setShareIconAnchorEl(event.currentTarget);
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  const handleShareMenuItemClick = () => {
    console.log("Link copied to clipboard");
    setIsShareMenuOpen(false);
  };

  const handleTagDropdownClose = () => {
    setIsTagDropdownOpen(false);
  };

  const handleFolderDropdownClose = () => {
    setIsFolderDropdownOpen(false);
  };

  // Simulated data for the timeline with milestones
  const milestones = [
    {
      version: "1.0",
      rating: 4.5,
      timesUsed: 100,
      changes: "Placeholder changes for version 1.0",
    },
    {
      version: "2.0",
      rating: 4.8,
      timesUsed: 200,
      changes: "Placeholder changes for version 2.0",
    },
    // Add more milestones as needed
  ];

  return (
    <Card>
      <CardContent>
        <h4>
          {title}{" "}
          <Tooltip title="Folder" arrow>
            <IconButton onClick={handleFolderIconClick}>
              <FolderIcon />
            </IconButton>
          </Tooltip>{" "}
          <Tooltip title="Tags" arrow>
            <IconButton onClick={handleTagIconClick}>
              <LabelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share" arrow>
            <IconButton onClick={handleShareIconClick}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </h4>
        <IconButton onClick={handleClick} sx={{ float: "right" }}>
          <MoreVertIcon />
        </IconButton>

        <TemplateContent textContent={textContent} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick("Edit")}>Edit</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Delete")}>
            Delete
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Link")}>Link</MenuItem>
          {selectedVersion && (
            <MenuItem onClick={() => handleMenuItemClick("Revert")}>
              Revert to {selectedVersion}
            </MenuItem>
          )}
        </Menu>
        <ShareMenu
          isShareMenuOpen={isShareMenuOpen}
          shareIconAnchorEl={shareIconAnchorEl}
          onClose={() => setIsShareMenuOpen(false)}
          onMenuItemClick={handleShareMenuItemClick}
        />
        <TagMenu
          isTagDropdownOpen={isTagDropdownOpen}
          tagIconAnchorEl={tagIconAnchorEl}
          onClose={handleTagDropdownClose}
        />
        <FolderMenu
          isFolderDropdownOpen={isFolderDropdownOpen}
          folderIconAnchorEl={folderIconAnchorEl}
          onClose={handleFolderDropdownClose}
        />
      </CardContent>
      <Milestones
        milestones={milestones}
        handleVersionClick={handleVersionClick}
      />
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <Typography variant="h6">
            Version {selectedVersion} Changes:
          </Typography>
          <Typography>
            {milestones.find((m) => m.version === selectedVersion)?.changes}
          </Typography>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TemplateCard;
