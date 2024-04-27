const express = require('express')
const cors = require('cors')
const connection = require("./configs/db")
const { workflowroute } = require("./routes/Workflow.route")
const { functionroute } = require("./routes/Function.route")
require('dotenv').config()

// Creating an Express app instance
const app = express()

// Middleware for parsing JSON requests
app.use(express.json())

// Middleware for handling Cross-Origin Resource Sharing (CORS)
app.use(cors())

// Route for the homepage
app.get("/", (req, res) => {
    res.send("homepage")
})

// Middleware for workflow routes
app.use("/workflow", workflowroute)

// Middleware for function routes
app.use("/function", functionroute)

// Starting the server
app.listen(process.env.PORT, async () => {
    try {
        // Waiting for database connection to be established
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }

    // Server is now listening on the specified port
    console.log(`The server is running on port ${process.env.PORT}`);
})
