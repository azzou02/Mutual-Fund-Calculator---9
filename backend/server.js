// Environment variables
require('dotenv').config();

// External libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

// Express setup
const app = express();
const port = 5001;

// Middleware setup
app.use(cors());
app.use(express.json());

const RISK_FREE_RATE = 0.0479; // from US Treasury

mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('MongoDB connected') })
  .catch(err => { console.log(err) });

// Cleans and formats an array of data objects.
function cleanData(data) {
  return data.map(item => {
    return {
      date: new Date(item.date).toLocaleDateString('en-US'),
      value: parseFloat(item.value).toFixed(2)
    };
  });
}

// Calculates the market return over a specified number of years based on provided data.
function calculateMarketReturn(data, years) {
  const validEntries = data.filter(entry => !isNaN(entry.value));
  if (validEntries.length === 0) {
    throw new Error('No valid data entries found');
  }

  const lastValidEntry = validEntries[validEntries.length - 1];
  const endDate = new Date(lastValidEntry.date);
  const startYear = endDate.getFullYear() - years;

  // Find the entry closest to the desired start date
  let closestEntry = null;
  for (const entry of validEntries) {
    const entryDate = new Date(entry.date);
    if (entryDate.getFullYear() === startYear) {
      closestEntry = entry;
      break;
    }
    if (!closestEntry || entryDate > new Date(closestEntry.date) && entryDate <= new Date(startYear + 1, 0, 1)) {
      closestEntry = entry;
    }
  }

  if (!closestEntry) {
    throw new Error('Starting price not found');
  }

  const startingPrice = parseFloat(closestEntry.value);
  const endingPrice = parseFloat(lastValidEntry.value);
  const marketReturn = (endingPrice - startingPrice) / startingPrice;
  return marketReturn;
}

// Fetches the market return rate for the S&P 500 index over a specified number of years.
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
    return returnRate;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
}

// Fetches the beta value of a given stock index.
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

// Calculates the future value of an investment based on the given ticker, amount, and duration.
async function calculateFutureValue(ticker, amount, duration) {
  try {
    const marketReturnRate = await getMarketReturn(1);
    const beta = await getBeta(ticker);
    const rate = RISK_FREE_RATE + beta * (marketReturnRate - RISK_FREE_RATE);
    const futureValue = amount * Math.exp(rate * duration);

    return {
      beta: beta,
      rate: rate,
      futureValue: futureValue,
      riskFreeRate: RISK_FREE_RATE
    };

  } catch (error) {
    console.error('Error calculating future value:', error);
    throw error;
  }
}

// Endpoint for calculating future value
app.post('/api/calculate', async (req, res) => {
  const { ticker, amount, duration } = req.body;
  try {
    const result = await calculateFutureValue(ticker, amount, duration);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate future value' });
  }
});

// Endpoint for market return
app.get('/market-return/:years', async (req, res) => {
  const years = parseInt(req.params.years);
  try {
    const returnRate = await getMarketReturn(years);
    res.json({ returnRate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market return' });
  }
});

// Endpoint for beta value
app.get('/api/index-beta/:index', async (req, res) => {
  const index = req.params.index;
  try {
    const beta = await getBeta(index);
    res.json({ beta });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch beta value' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});