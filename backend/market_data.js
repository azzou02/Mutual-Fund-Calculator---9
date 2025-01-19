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
            date: new Date(item.date).toLocaleDateString('en-US'),
            value: parseFloat(item.value).toFixed(2)
        };
    });
}

function calculateMarketReturn(data, years) {
    let lastValidEntry = null;
    data.forEach(entry => {
        if (entry.value !== "NaN") {
            lastValidEntry = entry;
        }
    });

    let endDate = lastValidEntry.date;
    let date = new Date(endDate);
    let startDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() - years}`;
    let starting_price = 0;
    let ending_price = parseFloat(lastValidEntry.value);

    data.forEach(entry => {
        if (entry.value !== "NaN") {
            if (entry.date === startDate) {
                starting_price = parseFloat(entry.value);
            }
        }
    });

    // console.log("Start price - " + startDate + ":", starting_price);
    // console.log("End price - " + endDate + ":", ending_price);
    return parseFloat(((ending_price - starting_price) / starting_price) * 100).toFixed(2);
}

async function getMarketReturn(years) {
    try {
        const fredURL = 'https://api.stlouisfed.org/fred/series/observations';
        const params = {
            series_id: 'SP500',
            api_key: process.env.FRED_API_KEY,
            file_type: 'json'
        };

        const response = await axios.get(fredURL, { params });
        const data = response.data.observations;
        const cleanedData = cleanData(data);
        const returnRate = calculateMarketReturn(cleanedData, years);
        // console.log(`Market return for the last ${years} years: ${returnRate}%`);
        return returnRate;
    } catch (error) {
        // console.error('Error fetching market data:', error);
        throw error;
    }
}

// Create an API endpoint
app.get('/market-return/:years', async (req, res) => {
    try {
        const years = parseInt(req.params.years);
        const returnRate = await getMarketReturn(years);
        res.json({ returnRate });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch market return' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Market return rate server running on http://localhost:${port}/market-return/:years`);
});

// Export both the app and the getMarketReturn function
module.exports = { getMarketReturn };