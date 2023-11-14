import React from "react";
import { Grid } from "@mui/material";
import AdvancedSearch from "../common/AdvancedSearch";
import TemplateCard from "./TemplateCard"; // Importing TemplateCard from the specific file

const DynamicTemplateList = () => {
  const templateData = [
    { title: "Template 1", textContent: "Your <text> content for Template 1 goes here." },
    { title: "Template 2", textContent: "Your <text> content for Template 2 goes here." },
    { title: "Template 3", textContent: "Your <text> content for Template 3 goes here." },
    // Add more template data as needed
  ];

  const gridStyle = {
    padding: "16px", // Add padding to all sides (top, left, right)
  };

  return (
    <Grid container spacing={3} sx={gridStyle}>
      <AdvancedSearch />
      {templateData.map((template, index) => (
        <Grid item xs={12} md={6} lg={3} key={index}>
          {/* Pass both title and textContent to TemplateCard */}
          <TemplateCard title={template.title} textContent={template.textContent} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicTemplateList;
