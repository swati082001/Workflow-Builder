import React, { useEffect, useState } from 'react';
import { Box, Button, Select, Text } from "@chakra-ui/react";
import { FaFileCsv } from "react-icons/fa6";
import { RiUploadCloudFill } from "react-icons/ri";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import "./CsvUploader.css";

// CsvUploader component definition
const CsvUploader = ({ onCsvUpload }) => {
    // State variables
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [workflowId, setWorkflowId] = useState([]);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);
    const [csvData, setCsvData] = useState('');
    const toast = useToast();

    // Event handlers for drag and drop functionality
    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    };

    // Handler for file input change
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    // Handling file upload
    const handleFileUpload = (file) => {
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target.result;
                setCsvData(csvData);
                onCsvUpload(csvData);
            };
            reader.readAsText(file);
        } else {
            toast({
                title: 'Please Upload CSV File',
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
        }
    };

    // Handler for clicking on the upload button
    const handleClick = () => {
        fileInputRef.current.click();
    };

    // Handler for running the workflow
    const handleRunWorkflow = async () => {
        try {
            if (selectedWorkflowId && selectedFile) {
                let data = {
                    csvdata: csvData,
                    workflowId: selectedWorkflowId
                };
                let res = await axios.post(`https://workflow-builder-be.onrender.com/function/`, data);
                console.log(res);
            } else {
                toast({
                    title: 'Please select a workflow ID and upload a CSV file',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fileInputRef = React.useRef(null);

    // Function to fetch workflow IDs
    const getWorkflowIds = async () => {
        try {
            let res = await axios.get(`https://workflow-builder-be.onrender.com/workflow/`);
            setWorkflowId(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Fetch workflow IDs when the component mounts
        getWorkflowIds();
    }, []);

    return (
        <>
            {/* Box for handling drag and drop functionality */}
            <Box
                className={`csv-uploader ${isDragging ? 'dragging' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
            >
                {/* File input */}
                <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                />
                {/* Display selected file information */}
                {selectedFile && (
                    <div className="file-selected">
                        <FaFileCsv />
                        <span>{selectedFile.name}</span>
                    </div>
                )}
                {/* Display upload area */}
                {!selectedFile && (
                    <div className='upload-file'>
                        <RiUploadCloudFill style={{ fontSize: '2rem', color: '#9b2158' }} />
                        <p className="upload-text">Drag and drop a CSV file here or click to upload.</p>
                    </div>
                )}
            </Box>

            {/* Dropdown for selecting workflow IDs */}
            <Box className='Dropdown'>
                <Text className="title">Select Workflow IDs</Text>
                {/* Dropdown menu */}
                <Select onChange={(e) => setSelectedWorkflowId(e.target.value)}>
                    {/* Mapping through workflow IDs */}
                    {workflowId.map((el, i) => (
                        <option key={i} value={el.workflowid}>{el.workflowid}</option>
                    ))}
                </Select>
                {/* Button to run workflow */}
                <Box className='save'>
                    <Button variant="outline" onClick={handleRunWorkflow}>Run Workflow</Button>
                </Box>
            </Box>
        </>
    );
};

export default CsvUploader;
