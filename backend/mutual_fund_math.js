const { getMarketReturn } = require('./market_data');
const { getBeta } = require('./beta_data');

const RISK_FREE_RATE = 0.0479; // from US Treasury

async function calculate(ticker, amount, duration) {
  try {
    const marketReturnRate = await getMarketReturn(1);
    const beta = await getBeta(ticker);
    // console.log("marketReturnRate:" + marketReturnRate);
    // console.log("beta:" + beta);
    return futureInvestmentValue(amount, duration, beta, marketReturnRate);
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

(async () => {
  try {
    const result = await calculate('AAPL', 1000, 5);
    console.log('Future Investment Value:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();

module.exports = { calculate };