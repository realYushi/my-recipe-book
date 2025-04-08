const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Recipe Book API is running' });
});

// Basic recipes endpoints
app.get('/recipes', (req, res) => {
    res.json([]);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});