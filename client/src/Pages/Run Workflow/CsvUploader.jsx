import React, { useEffect, useState } from 'react';
import { Box,Button,Select, Text} from "@chakra-ui/react";
import { FaFileCsv } from "react-icons/fa6";
import { RiUploadCloudFill } from "react-icons/ri";
import { useToast } from '@chakra-ui/react';
import axios from "axios"
import "./CsvUploader.css";

const CsvUploader = ({ onCsvUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [workflowId,setworkflowId] = useState([]);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);
    const [csvData,setcsvdata] = useState('')
    const toast = useToast()

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

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    const handleFileUpload = (file) => {
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target.result;
                setcsvdata(csvData)
                onCsvUpload(csvData);
            };
            reader.readAsText(file);
        } else {
          toast({
            title: 'Please Upload CSV File',
            status: 'error',
            duration: 6000,
            isClosable: true,
          })
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleRunWorkflow = async () => {
        try {
            if (selectedWorkflowId && selectedFile) {
                
                let data = {
                    csvdata: csvData,
                    workflowId: selectedWorkflowId
                };
                console.log(data,"data");
                // let res = await axios.post(`http://localhost:3000/function/`)
                // console.log(res)
                
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

    const getWorkflowids = async()=>{
        try {
            let res = await axios.get(`http://localhost:3000/workflow/`)
            console.log(res.data)
            setworkflowId(res.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
       getWorkflowids()
    },[])

    return (
        <>
        <Box
            className={`csv-uploader ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
        >
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
            />
            {selectedFile && (
                <div className="file-selected">
                    <FaFileCsv />
                    <span>{selectedFile.name}</span>
                </div>
            )}
            {!selectedFile && (
              <div className='upload-file'>
                <RiUploadCloudFill  style={{ fontSize: '2rem', color: '#9b2158' }} />
                <p className="upload-text">Drag and drop a CSV file here or click to upload.</p>
              </div>
            )}
        </Box>

        <Box className='Dropdown'>
                <Text className="title">Select Workflow Ids</Text>
                <Select onChange={(e) => setSelectedWorkflowId(e.target.value)}>
                    {workflowId.map((el,i)=>(
                        <option key={i} value={el.workflowid}>{el.workflowid}</option>
                    ))}
                    
                </Select>

                <Box className='save'>
                    <Button variant="outline" onClick={handleRunWorkflow}>Run Workflow</Button>
                </Box>

            </Box>
        </>
    );
};

export default CsvUploader;
