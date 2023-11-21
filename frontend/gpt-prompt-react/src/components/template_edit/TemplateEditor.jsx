import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PlaceholderSidebar from "./PlaceholderSidebar";
import TemplatePartsSidebar from "./TemplatePartsSidebar";
import DropTargetBox from "./DropTargetBox";
import { Box, Grid } from "@mui/material";

const Editor = () => {
  const [text, setText] = useState("");
  const placeholders = ["text", "date", "name", "custom"];
  const [templateParts, setTemplateParts] = useState(["Part 1", "Part 2", "Part 3"]);
  const [textInputs, setTextInputs] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          width: "calc(95vw - 16px)",
          height: "calc(95vh - 16px)",
          margin: 2,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} style={{ width: "100%", height: "100%" }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: 2, height: "100%", overflowY: "auto" }}>
              <PlaceholderSidebar placeholders={placeholders} />
              <TemplatePartsSidebar templateParts={templateParts} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} sx={{ height: '100%' }}>
            <DropTargetBox 
              textInputs={textInputs} 
              setTextInputs={setTextInputs} 
              setText={setText} 
            />
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default Editor;

