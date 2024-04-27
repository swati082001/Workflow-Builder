# Workflow Builder Application

## Backend Deployed Link
`https://workflow-builder-be.onrender.com/`

## Final Deployed Link
`https://workflow-builder-nu.vercel.app/`

## Overview

This web application allows users to design and execute custom workflows for basic data manipulation tasks. Users can visually construct workflows using a drag-and-drop interface and then trigger the execution of these workflows on uploaded data. The application provides a seamless integration of frontend (built with React.js and Reactflow) and backend (built with Node.js/Express.js) components, along with database support for storing workflow definitions.

## Features

### Frontend (Reactflow)

- **Drag-and-Drop Workflow Builder:** Users can drag and drop pre-defined nodes onto the canvas to build their desired workflows.
- **Visual Workflow Construction:** Nodes can be connected to define the execution order based on user interaction, providing a visual representation of the workflow.
- **Workflow Saving and Loading:** The application allows users to save and load previously created workflows, facilitating workflow management and reusability.
- **Workflow Execution Progress:** Visual feedback showcases the progress of workflow execution, enabling users to monitor the process in real-time.
- **Workflow Persistence:** Each workflow is saved with a unique ID, ensuring easy retrieval and management of workflow configurations.

### Frontend (Call Workflow)

- **Data Upload Portal:** Users can upload CSV files through a simple portal, enabling seamless integration of input data with the workflow execution process.
- **Workflow Selection:** Users can select a pre-defined workflow from a dropdown menu, specifying the desired sequence of data manipulation tasks.
- **Execution Trigger:** A submit button initiates the execution of the selected workflow on the uploaded CSV file, seamlessly integrating frontend and backend functionalities.

### Backend (Node.js)

- **Workflow Interpretation:** Upon receiving workflow data (node types, connections), the backend interprets the workflow and executes tasks in the defined sequence, ensuring accurate and efficient workflow execution.
- **Task Execution:** Backend logic handles each node type (e.g., Filter Data, Wait, Convert Format, Send POST Request) according to the specified functionality, enabling seamless integration with frontend workflow configurations.
- **Error Handling:** The backend gracefully handles errors and provides informative feedback to the user interface, ensuring a smooth and reliable user experience.

## Technical Stack

- **Frontend:** React.js, Reactflow
- **Backend:** Node.js (Express.js recommended)
- **Database:** MongoDB/PostgreSQL (as per choice)
- **Additional Libraries:** Various npm packages for frontend and backend development, as required.

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies for both frontend and backend using `npm install`.
4. Start the frontend development server using `npm run dev`.
5. Start the backend server using `npm run start` for the nodemon to work.

## Screenshots
   
![Screenshot 2024-04-27 213046](https://github.com/swati082001/Workflow-Builder/assets/103181682/b61fa6f5-1d53-4418-80a6-8fc756d572ab)

![Screenshot 2024-04-27 214223](https://github.com/swati082001/Workflow-Builder/assets/103181682/ae0990e3-d235-470b-b959-2648eced3d35)

![Screenshot 2024-04-27 214610](https://github.com/swati082001/Workflow-Builder/assets/103181682/8e4fedfc-af07-44f7-87e8-34bd71f9e09f)




## Additional Information

- For more details on Reactflow usage and implementation, refer to the [Reactflow documentation](https://reactflow.dev/learn).
- Explore the [Reactflow examples](https://github.com/xyflow/react-flow-example-apps) for workflow builder applications.
- Sample CSV file (`tsx-data.csv`) is provided for testing purposes, but users can also create their own CSV files for data manipulation tasks.

---
