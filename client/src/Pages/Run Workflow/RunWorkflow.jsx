import React from 'react'
import Navbar from '../../Component/Navbar'
import CsvUploader from './CsvUploader';
import "./CsvUploader.css"

const RunWorkflow = () => {
  const handleCsvUpload = (csvData) => {
    console.log(csvData);
  };
  return (
    <div className="run-workflow-container">
    <Navbar />
    <div className="content-container">
        <h2 className="title">Upload CSV File</h2>
        <CsvUploader onCsvUpload={handleCsvUpload} />
    </div>
  </div>
  )
}

export default RunWorkflow