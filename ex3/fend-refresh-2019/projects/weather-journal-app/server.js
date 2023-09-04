// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
app.use(express.static("public"));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

// GET route to return the projectData object
app.get("/data", (req, res) => {
  res.send(projectData);
});

// POST route to add incoming data to projectData
app.post("/data", (req, res) => {
  // Assuming the incoming data is in the request body
  const newData = req.body;

  // Add the new data to the projectData object
  projectData = {
    ...projectData,
    ...newData,
  };

  res.send("Data added successfully!");
});

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
