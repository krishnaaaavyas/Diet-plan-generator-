const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;  // Changed to 3001

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
// Check if the connection was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
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
// GET route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Fitness Tracker App!');
});


// POST route for form submission
app.post('/submit-form', async (req, res) => {
    const formData = new FitnessEntry(req.body);

    try {
        await formData.save();
        res.status(201).send('Form submitted successfully!');
    } catch (error) {
        res.status(400).send('Error submitting form: ' + error.message);
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
