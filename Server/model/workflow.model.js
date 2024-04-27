const mongoose = require("mongoose");

// Defining the schema for workflows
const workflowSchema = mongoose.Schema({
    workflowid: { type: String, required: true }, // Unique ID for the workflow
    workfloworder: { type: Array, required: true } // Array containing the order of functions in the workflow
})

// Creating a model based on the workflow schema
const workflowModel = mongoose.model("workflow", workflowSchema);

// Exporting the workflow model
module.exports = { workflowModel };
