import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {Box, Text} from "@chakra-ui/react"
import Sidebar from './Sidebar';
import Navbar from "../../Component/Navbar.jsx";
import { useToast } from '@chakra-ui/react';

import './workflow.css';
import axios from 'axios';

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

const Workflow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [workflowId,setWorkflowId] = useState('')
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const toast = useToast()

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
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
      console.log(newNode)

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const generateAlphanumericId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    setWorkflowId(Array.from({ length: 8 }, () => charset[Math.floor(Math.random() * charset.length)]).join('')) ;
  };


  const saveWorkflow = async() => {
    
    const connections = edges.map(edge => ({
      source: edge.source,
      target: edge.target
    }));
    
    console.log("Connections:", connections);
    let res = []
    connections.map((el,i)=>{
      if(i==0){
        res.push(el.source);
        res.push(el.target)
      }
      else{
        res.push(el.target)
      }
    })
    let lastCommand = res[res.length-1].split("_")
    if(lastCommand[0]!=='end'){
      toast({
        title: 'The last node should always be the End Node',
        status: 'error',
        duration: 6000,
        isClosable: true,
    });
    return;
    }

    let data = {
      workflowid : workflowId,
      workfloworder : res
    }

    console.log(data,"result")

    try {
      let res = await axios.post(`http://localhost:3000/workflow/`,data);
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    generateAlphanumericId()
  },[])

  return (
    <>
    <Navbar />
    <Box className="dndflow">
      
      <ReactFlowProvider>
        <Box className="reactflow-wrapper" ref={reactFlowWrapper}>
          <Text className='WorkflowId'>Id: {workflowId}</Text>
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
            <Controls />
          </ReactFlow>
        </Box>
        <Sidebar onSave={saveWorkflow} />
      </ReactFlowProvider>
    </Box>
    </>
  );
};

export default Workflow;
