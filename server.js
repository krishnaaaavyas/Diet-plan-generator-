const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error: ", err);
});

// Define Mongoose Schema for Fitness Tracker form
const fitnessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  familyHistory: [String],  // Array of strings (checkboxes)
  currentDiseases: { type: String, required: true },
  currentDiseasesDetails: { type: String },
  dailyActivities: { type: String, required: true },
  sleep: { type: String, required: true },
  waterIntake: { type: String, required: true },
  steps: { type: String, required: true },
  healthGoals: { type: String, required: true }
});

// Mongoose Model
const FitnessEntry = mongoose.model('FitnessEntry', fitnessSchema);

// POST route for form submission
app.post('/submit-form', async (req, res) => {
    const formData = new FitnessEntry(req.body);  // Create a new instance of the model with form data

    try {
        await formData.save();  // Save the form data to MongoDB
        res.status(201).send('Form submitted successfully!');
    } catch (error) {
        res.status(400).send('Error submitting form: ' + error.message);
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
