const express = require('express');
const path = require('path');
const saveResponse = require('./api/saveResponse');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to save survey responses (now uses MongoDB)
app.post('/api/saveResponse', saveResponse);

app.get('/logicmodel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'logicmodel.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});