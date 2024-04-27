// Sidebar.js
import React from 'react';
import { Box, Button } from "@chakra-ui/react";

const Sidebar = ({ onSave }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <Box>
        <Box className="description">WORKFLOW NODES</Box>
        <Box className="dndnode node start" onDragStart={(event) => onDragStart(event, 'start')} draggable aria-label="start Node">
          Start
        </Box>
        <Box className="dndnode node filter" onDragStart={(event) => onDragStart(event, 'filter')} draggable aria-label="filter Node">
          Filter
        </Box>
        <Box className="dndnode node wait" onDragStart={(event) => onDragStart(event, 'wait')} draggable aria-label="Wait Node">
          Wait
        </Box>
        <Box className="dndnode node convert" onDragStart={(event) => onDragStart(event, 'convert')} draggable aria-label="Convert Node">
          Convert
        </Box>
        <Box className="dndnode node post" onDragStart={(event) => onDragStart(event, 'post')} draggable aria-label="Post Node">
          Post
        </Box>
        <Box className="dndnode node end" onDragStart={(event) => onDragStart(event, 'end')} draggable aria-label="End Node">
          End
        </Box>
      </Box>
      <Box className='save'>
        <Button variant="outline" onClick={onSave}>Save Workflow</Button>
      </Box>
    </aside>
  );
};

export default Sidebar;
