const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

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
    // Find last valid date and value
    let lastValidEntry = null
    data.forEach(entry => {
        if (entry.value !== "NaN") {
            lastValidEntry = entry
        }
    })
    
    // calculate date X years back
    let endDate = lastValidEntry.date
    let date = new Date(endDate)
    let startDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() - years}`
    
    let starting_price = 0
    let ending_price = parseFloat(lastValidEntry.value)  // We already know this
    
    data.forEach(entry => {
        if (entry.value !== "NaN") {
            if (entry.date === startDate) {
                starting_price = parseFloat(entry.value)
            }
        }
    })
    
    console.log("Start price - " + endDate + ":", starting_price)
    console.log("End price - " + startDate + ":", ending_price)
    
    return parseFloat(((ending_price - starting_price) / starting_price) * 100).toFixed(2)
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

        // optional parameters
        if (start_date) params.observation_start = start_date;
        if (end_date) params.observation_end = end_date;

        // Fetch data from the API
        const response = await axios.get(fredURL, { params });

        // Clean, process, and send the data
        const cleanedData = cleanData(response.data.observations);
        res.json(cleanedData);
        
        // calculate market return
        let years = 5
        console.log("The return from the last " + years + " years: " + calculateMarketReturn(cleanedData, years) + " %");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api/sp500`);
});