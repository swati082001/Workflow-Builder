const express = require('express');
const { functionModel } = require("../model/function.model");
const { workflowModel }  = require('../model/workflow.model');
const axios = require('axios');
const functionroute = express.Router();

// Function to post data to an external endpoint
async function postData(data){
    try {
        let res = await axios.post(`https://workflow.requestcatcher.com/test`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
}

// Function to filter CSV data
function filterData(csvData){
    return csvData.toLowerCase();
}

// Function to convert CSV data to JSON
function convertData(csvData){
    const lines = csvData.split('\r\n'); // Split CSV into lines
    const headers = lines[0].split(','); // Extract headers from the first line
    const jsonData = [];

    // Loop through each line (excluding the header)
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(','); // Split line into columns
        const row = {};
        // Loop through each column and map it to its respective header
        for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = columns[j];
        }
        jsonData.push(row); // Push the row object to the JSON array
    }

    return jsonData;
}

// Function to simulate a waiting period
function wait(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Wait is complete after 60 seconds");
        }, 60000);
    });
}

// Route to handle function execution
functionroute.post('/', async(req, res) => {
    try {
        const functionpost = new functionModel(req.body);
        await functionpost.save();
        let getWorkflowIdData = await workflowModel.find({ workflowid: req.body.workflowid });
        let order = getWorkflowIdData[0].workfloworder;
        let response = [];
        // Iterate through each function in the workflow order
        for (let i = 0; i < order.length; i++) {
            let orderName = order[i].split("_");
            if (orderName[0] == "start") {
                response.push({"start": "The start of the function"});
            } else if (orderName[0] == "filter") {
                let filtercsv = filterData(req.body.csvdata);
                response.push({"filter": filtercsv});
            } else if (orderName[0] == "wait") {
                wait().then((message) => {
                    response.push({"wait": message});
                });
            } else if (orderName[0] == "convert") {
                let filtercsv = filterData(req.body.csvdata);
                let convertcsv = convertData(filtercsv);
                response.push({"convert": convertcsv});
            } else if (orderName[0] == "post") {
                let filtercsv = filterData(req.body.csvdata);
                let convertcsv = convertData(filtercsv);
                let postcsv = postData(convertcsv);
                response.push({"post": postcsv});
            } else if (orderName[0] == "end") {
                response.push({"end": "Workflow ended"});
                // Send response indicating workflow completion
                res.send({
                    "Message": "The workflow has finally been completed",
                    "data": response
                });
            }
        }
    } catch (error) {
        res.send({
            'Message': error.message
        });
    }
});

module.exports = { functionroute };
