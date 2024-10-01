const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to accept form submission
app.post('/submit-response', (req, res) => {
    const userResponse = req.body;  // Capture the user response from the request body

    // Convert user response to JSON string
    const jsonResponse = JSON.stringify(userResponse, null, 2);

    // Optionally save the JSON response to a file
    fs.writeFile('userResponse.json', jsonResponse, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Response received and saved successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
