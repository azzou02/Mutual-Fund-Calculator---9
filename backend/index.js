const express = require('express');
const app = express();
const port = 3001;  // http://localhost:3001/api/test

// this is a test for piyush's branch

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});