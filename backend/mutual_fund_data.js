const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

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

        // Make the request to FRED API
        const response = await axios.get(fredURL, { params });

        // Send the response back to the client
        res.json(response.data);

    } catch (error) {
        console.error('Error fetching SP500 data:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch SP500 data',
            message: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        message: err.message 
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});