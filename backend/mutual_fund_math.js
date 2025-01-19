const { getMarketReturn } = require('./market_data');

const RISK_FREE_RATE = 0.0479; // from US Treasury

async function calculate(ticker, amount, duration) {
  try {
    const marketReturnRate = await getMarketReturn(1);
    // const beta = await getBeta(ticker);
    return futureInvestmentValue(amount, duration, 1, marketReturnRate);
  } catch (error) {
    console.error('Error calculating future value:', error);
    throw error;
  }
}

//Calculates future value
//get marketReturnRate from API
//get beta from newton API
function futureInvestmentValue(principal, years, beta, marketReturnRate)  {
  const rate = RISK_FREE_RATE + beta *(marketReturnRate - RISK_FREE_RATE);
  const futureValue = principal * Math.exp(rate*years);
  return futureValue;
}

calculate('FXAIX', 1000, 7).then(console.log).catch(console.error);