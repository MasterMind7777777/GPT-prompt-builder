import React from 'react';
import { useDrop } from 'react-dnd';
import AdvancedTextInput from './AdvancedTextInput';
import { Paper, Box } from '@mui/material';

const DropTargetBox = ({ textInputs, setTextInputs, setText }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "template-part",
    drop: (item) => handleDrop(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDrop = (item) => {
    setTextInputs((prev) => [...prev, { id: prev.length, text: item.text }]);
  };

  return (
    <Paper
      ref={drop}
      sx={{
        height: '95%',
        padding: 2,
        borderRadius: '10px',
        border: '1px solid #000000',
        backgroundColor: isOver ? '#f0f0f0' : 'transparent',
        overflow: 'scroll',
      }}
    >
      <Box>
        {textInputs.map((input) => (
          <AdvancedTextInput key={input.id} text={input.text} setText={setText} />
        ))}
      </Box>
    </Paper>
  );
};

export default DropTargetBox;

