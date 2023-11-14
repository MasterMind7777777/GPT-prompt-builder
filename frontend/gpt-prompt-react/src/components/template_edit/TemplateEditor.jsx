import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AdvancedTextInput from './AdvancedTextInput';
import PlaceholderSidebar from './PlaceholderSidebar';
import { Box, Grid } from '@mui/material';

const Editor = () => {
  const [text, setText] = useState('');
  const placeholders = ["text", "date", "name", "custom"]; // Define your placeholders here

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ 
        width: 'calc(95vw - 16px)', // Subtract margin from total width
        height: 'calc(95vh - 16px)', // Subtract margin from total height
        margin: 2, // Margin
        overflow: 'hidden', // Prevent scrolling
        display: 'flex', // Ensuring proper alignment and distribution of children
        justifyContent: 'center', // Center children horizontally
        alignItems: 'center' // Center children vertically
      }}>
        <Grid container spacing={2} style={{ width: '100%', height: '100%' }}> {/* Add spacing between grid items */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: 2, height: '100%', overflowY: 'auto' }}>
              <PlaceholderSidebar placeholders={placeholders} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ padding: 2, height: '100%' }}>
              <AdvancedTextInput text={text} setText={setText} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default Editor;

