import React from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const TemplateContent = ({ textContent }) => {
  // Split the text content into parts based on '<' and '>'
  const parts = textContent.split(/(<|>)/);

  // Flag to determine if the current part is inside a placeholder
  let insidePlaceholder = false;

  // Map the parts to elements, replacing placeholders with bubble-style Chips
  const contentElements = parts.map((part, index) => {
    if (part === "<") {
      insidePlaceholder = true;
      return null; // Skip the '<' character
    } else if (part === ">") {
      insidePlaceholder = false;
      return null; // Skip the '>' character
    } else if (insidePlaceholder) {
      // If inside a placeholder, display it as a Chip
      return (
        <Chip
          key={index}
          label={part}
          color="primary"
          variant="outlined"
          style={{
            margin: "2px",
            fontSize: "16px", // Adjust the font size as needed
            padding: "6px 12px", // Adjust the padding as needed
          }}
        />
      );
    } else {
      // If not inside a placeholder, display it as plain text
      return <span key={index}>{part}</span>;
    }
  });

  return (
    <Box border="1px solid #ccc" p={2} borderRadius={4}>
      <Typography variant="body1">{contentElements}</Typography>
    </Box>
  );
};

export default TemplateContent;

