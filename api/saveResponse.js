const fs = require('fs');
const path = require('path');

const saveResponse = (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, '../responses.json'); // Adjust path to responses.json

    // Read the existing responses file
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        const responses = err ? [] : JSON.parse(fileData); // Initialize as empty array if file doesn't exist
        responses.push(data); // Add the new response

        // Write the updated responses back to the file
        fs.writeFile(filePath, JSON.stringify(responses, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving response:', writeErr);
                return res.status(500).send('Error saving response');
            }
            console.log('Response saved successfully');
            res.status(200).send('Response saved');
        });
    });
};

module.exports = saveResponse;