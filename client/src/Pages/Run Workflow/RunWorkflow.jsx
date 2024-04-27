import React from 'react';
import Navbar from '../../Component/Navbar'; // Importing Navbar component
import CsvUploader from './CsvUploader'; // Importing CsvUploader component
import "./CsvUploader.css"; // Importing CSS for styling

// RunWorkflow component definition
const RunWorkflow = () => {
  // Function to handle CSV upload
  const handleCsvUpload = (csvData) => {
    console.log(csvData); // Logging the uploaded CSV data
  };

  return (
    <div className="run-workflow-container">
      {/* Render Navbar component */}
      <Navbar />
      <div className="content-container">
        {/* Title for the upload section */}
        <h2 className="title">Upload CSV File</h2>
        {/* Render CsvUploader component and pass handleCsvUpload function as prop */}
        <CsvUploader onCsvUpload={handleCsvUpload} />
      </div>
    </div>
  );
};

export default RunWorkflow;
