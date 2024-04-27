const mongoose = require("mongoose");

// Defining the schema for functions
const functionSchema = mongoose.Schema({
    csvdata: { type: String, required: true }, // Data from CSV file
    workflowid: { type: String, required: true } // ID of the workflow to which this function belongs
})

// Creating a model based on the function schema
const functionModel = mongoose.model("function", functionSchema);

// Exporting the function model
module.exports = { functionModel };
