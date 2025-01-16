const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Function to clean and handle the data
function cleanData(data) {
    return data.map(item => {
        return {
            date: new Date(item.date).toLocaleDateString('en-US'), // Format date to MM/DD/YYYY
            value: parseFloat(item.value).toFixed(2) // Format value to 2 decimal places
        };
    });
}

function calculateMarketReturn(data, years) {

}

// Create an endpoint to fetch SP500 data
app.get('/api/sp500', async (req, res) => {
    try {
        // Get optional query parameters
        const { start_date, end_date } = req.query;
        
        // Base URL and parameters
        const fredURL = 'https://api.stlouisfed.org/fred/series/observations';
        const params = {
            series_id: 'SP500',
            api_key: process.env.FRED_API_KEY,
            file_type: 'json'
        };

        // Add optional parameters if provided
        if (start_date) params.observation_start = start_date;
        if (end_date) params.observation_end = end_date;

        // Fetch data from the API
        const response = await axios.get(fredURL, { params });

        // Clean, process, and send the data
        const cleanedData = cleanData(response.data.observations);
        calculateMarketReturn(cleanedData, 5);
        res.json(cleanedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api/sp500`);
});