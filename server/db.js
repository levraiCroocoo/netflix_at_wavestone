const mongoose = require('mongoose');
const dbURL = process.env.DATABASE_URL;
const Serie = require('./data_models');
// const Scriptwriter = require('./data_models');
const fs = require('node:fs');

// Delete all existing data in the database
async function DeleteAllData(Model)
{
    await Model.collection.deleteMany({})
}

// Add the series from the corresponding json file
async function AddData(Model, filename)
{
    // Read the data from the json file
    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err)    console.error(err);
        else {
            var resource_data = JSON.parse(data);
            // Save the data in the database
            await Model.collection.insertMany(resource_data, (err) => {
                if(err)     console.log("Cannot create new record: %s", err);
                else        console.log("Data has been successfully loaded");
            })
        }
    })
}

// Connect to the database, delete all the existing data and load the required data
async function connectDB()
{
    try 
    {
        const conn = await mongoose.connect(dbURL);
        console.log(`MongoDB Connected on ${conn.connection.host}`);
        // Delete all existing data before starting using the database
        console.log('Deleting all data in the database ...');
        // DeleteAllData(Scriptwriter);
        DeleteAllData(Serie);
        // Add all necessary data automatically at the start
        console.log('Loading all data in the database ...');
        const json_series_file = "../data/series.json"
        AddData(Serie, json_series_file);
        // const json_scriptwriters_file = "../data/scriptwriters.json"
        // AddData(Scriptwriter, json_scriptwriters_file);
    } 
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;