const express = require('express');
const saveResponse = require('./api/saveResponse');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to save survey responses
app.post('/api/saveResponse', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'responses.json');

    // Append data to a JSON file
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        const responses = err ? [] : JSON.parse(fileData);
        responses.push(data);

        fs.writeFile(filePath, JSON.stringify(responses, null, 2), (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).send('Error saving response');
            }
            res.status(200).send('Response saved');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});