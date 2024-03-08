const express = require('express');
const mongoose = require('mongoose');
const JobPostingr = require('./models/jobposting');

const app = express();

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/christine');
        // console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with a non-zero status code
    }
}
// Create a schema for your collection

// Create a model based on the schema

// Route to get all documents in the collection
app.get('/documents', async (req, res) => {
  try {
      const documents = await JobPostingr.find();
    res.json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  // console.log('Server is running on port 3000');
});


// Call the function to connect to MongoDB
connectToMongoDB();