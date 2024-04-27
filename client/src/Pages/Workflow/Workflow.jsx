import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Text } from "@chakra-ui/react";
import Sidebar from './Sidebar';
import Navbar from "../../Component/Navbar.jsx";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import './workflow.css';

const initialNodes = [
  {
    id: 'start_1', 
    type: 'start',
    data: { label: 'start' },
    position: { x: 250, y: 5 },
  }
];

let id = 2;
const getId = (prefix) => `${prefix}_${id++}`;

// Workflow component definition
const Workflow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [workflowId, setWorkflowId] = useState('');
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const toast = useToast();

  // Function to handle connection between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  // Function to handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Function to handle drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(type), 
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  // Function to generate alphanumeric workflow ID
  const generateAlphanumericId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    setWorkflowId(Array.from({ length: 8 }, () => charset[Math.floor(Math.random() * charset.length)]).join('')) ;
  };

  // Function to save the workflow
  const saveWorkflow = async () => {
    const connections = edges.map(edge => ({
      source: edge.source,
      target: edge.target
    }));
    
    let res = []
    connections.forEach((el, i) => {
      if (i === 0) {
        res.push(el.source);
        res.push(el.target);
      } else {
        res.push(el.target);
      }
    });

    let lastCommand = res[res.length - 1].split("_");
    if (lastCommand[0] !== 'end') {
      toast({
        title: 'The last node should always be the End Node',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    let data = {
      workflowid: workflowId,
      workfloworder: res
    };

    try {
      let res = await axios.post(`https://workflow-builder-be.onrender.com/workflow/`, data);
      console.log(res);
      toast({
        title: 'Workflow Created',
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateAlphanumericId();
  }, []);

  return (
    <>
      {/* Render Navbar component */}
      <Navbar />
      <Box className="dndflow">
        {/* ReactFlowProvider for ReactFlow component */}
        <ReactFlowProvider>
          <Box className="reactflow-wrapper" ref={reactFlowWrapper}>
            {/* Display workflow ID */}
            <Text className='WorkflowId'>Id: {workflowId}</Text>
            {/* Render ReactFlow component */}
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              {/* Render Controls */}
              <Controls />
            </ReactFlow>
          </Box>
          {/* Render Sidebar component */}
          <Sidebar onSave={saveWorkflow} />
        </ReactFlowProvider>
      </Box>
    </>
  );
};

export default Workflow;
