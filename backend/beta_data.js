const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

// Create an endpoint to fetch index beta
app.get('/api/index-beta', async (req, res) => {
    try {
        // Base URL and parameters
        let ticker = 'FXAIX';
        const betaURL = ' https://api.newtonanalytics.com/stock-beta';
        const params = {
            ticker: ticker,
            index: '^GSPC',
            interval: '1mo',
            observations: '12'
        };

        // Fetch data from the API
        const response = await axios.get(betaURL, { params });
        res.json(response.data);
        console.log(response.data.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api/index-beta`);
});