const express = require('express');
const {workflowModel} = require("../model/workflow.model")

// Creating a router instance for workflow routes
const workflowroute = express.Router()

// Route for fetching all workflows
workflowroute.get("/",async(req,res)=>{
    try {
        // Finding all workflows in the database
        const ans = await workflowModel.find()
        res.json(ans)
        
    } catch (error) {
        // Handling errors if any occur during fetching workflows
        res.send({
            "msg":error.message
        })
    }
})

// Route for creating a new workflow
workflowroute.post("/",async(req,res)=>{
    // Logging the request body for debugging
    console.log(req.body)
    try {
        // Creating a new workflow instance with the data from the request body
        const data = new workflowModel(req.body)
        // Saving the new workflow to the database
        await data.save();
        // Sending success response with the saved data
        res.send({
            message: "post req successful",
            data: data
        })
    } catch (error) {
        // Handling errors if any occur during workflow creation
        res.send({
            "msg":error.message
        })
    }
})

// Exporting the workflow router
module.exports = {workflowroute}
