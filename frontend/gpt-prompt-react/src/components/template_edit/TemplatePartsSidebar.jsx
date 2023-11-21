import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Paper, Typography } from '@mui/material';

const TemplatePart = ({ text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "template-part",
    item: { text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper 
      ref={drag} 
      sx={{ 
        opacity: isDragging ? 0.5 : 1, 
        marginBottom: 2,
        padding: 1,
        cursor: 'grab' 
      }}
    >
      <Typography>{text}</Typography>
    </Paper>
  );
};

const TemplatePartsSidebar = ({ templateParts }) => {
  return (
    <Box sx={{ padding: 2, height: '100%', overflowY: 'auto' }}>
      {templateParts.map((part, index) => (
        <TemplatePart key={index} text={part} />
      ))}
    </Box>
  );
};

export default TemplatePartsSidebar;

