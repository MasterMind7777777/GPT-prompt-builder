import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const SearchIconButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1005,
  backgroundColor: "transparent",
  border: "none",
  padding: theme.spacing(1),
  "& .MuiSvgIcon-root": {
    borderRadius: "50%",
  },
}));

const SearchBoxContent = ({ closeSearch, searchBoxPosition, setSearchBoxPosition }) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Rnd
      size={searchBoxPosition.size}
      position={searchBoxPosition.position}
      onDragStop={(e, d) => {
        setSearchBoxPosition((prev) => ({
          ...prev,
          position: {
            x: Math.max(0, Math.min(windowDimensions.width - prev.size.width, d.x)),
            y: Math.max(0, Math.min(windowDimensions.height - prev.size.height, d.y)),
          },
        }));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSearchBoxPosition((prev) => ({
          ...prev,
          size: { width: ref.offsetWidth, height: ref.offsetHeight },
          position: {
            x: Math.max(0, Math.min(windowDimensions.width - ref.offsetWidth, position.x)),
            y: Math.max(0, Math.min(windowDimensions.height - ref.offsetHeight, position.y)),
          },
        }));
      }}
      minWidth={320}
      minHeight={180}
      bounds="window"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "4px",
          borderWidth: "2px",
          borderColor: "black",
          backgroundColor: "transparent",
          borderStyle: "solid",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <TextField
            label="Search..."
            variant="outlined"
            fullWidth
            autoFocus
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          />
          <IconButton onClick={closeSearch} style={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={closeSearch}
          style={{ marginTop: 8 }}
        >
          Search
        </Button>
      </div>
    </Rnd>
  );
};

const AdvancedSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchBoxPosition, setSearchBoxPosition] = useState({
    size: { width: 320, height: 180 },
    position: { x: window.innerWidth - 340, y: 100 },
  });

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  return (
    <div>
      <SearchIconButton onClick={toggleSearch}>
        <SearchIcon />
      </SearchIconButton>

      {showSearch && (
        <SearchBoxContent
          closeSearch={closeSearch}
          searchBoxPosition={searchBoxPosition}
          setSearchBoxPosition={setSearchBoxPosition}
        />
      )}
    </div>
  );
};

export default AdvancedSearch;

