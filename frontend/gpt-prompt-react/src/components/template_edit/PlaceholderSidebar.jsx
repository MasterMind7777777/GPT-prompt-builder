import React from "react";
import { useDrag } from "react-dnd";
import { Paper, Typography, Box } from "@mui/material";

const Placeholder = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLACEHOLDER",
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      elevation={isDragging ? 1 : 3} // Change elevation on drag
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        padding: 1,
        margin: 1,
        backgroundColor: isDragging ? "action.hover" : "background.paper",
        ":hover": {
          backgroundColor: "action.hover",
          boxShadow: 6,
        },
      }}
    >
      <Typography variant="body1">{name}</Typography>
    </Paper>
  );
};

const PlaceholderSidebar = ({ placeholders }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      {placeholders.map((placeholder) => (
        <Placeholder key={placeholder} name={placeholder} />
      ))}
    </Box>
  );
};

export default PlaceholderSidebar;
