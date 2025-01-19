const axios = require('axios');
const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

async function getBeta(index) {
    try {
        const betaURL = 'https://api.newtonanalytics.com/stock-beta';
        const params = {
            ticker: index,
            index: '^GSPC',
            interval: '1mo',
            observations: '12'
        };
        
        const response = await axios.get(betaURL, { params });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching beta:', error);
        throw error;
    }
}

// Create an endpoint to fetch index beta
app.get('/api/index-beta/:index', async (req, res) => {  // Added :index parameter
    try {
        const beta = await getBeta(req.params.index);
        res.json({ beta });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch beta data',
            details: error.message 
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api/index-beta/:index`);
});

module.exports = { getBeta };