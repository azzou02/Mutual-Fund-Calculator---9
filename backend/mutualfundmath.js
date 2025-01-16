
const RISK_FREE_RATE = 0.0479; // from US Treasury

//Calculates future value
//get marketReturnRate from API
//get beta from newton API
function futureInvestmentValue(principal, years, beta, marketReturnRate)  {
  const rate = RISK_FREE_RATE + beta *(marketReturnRate - RISK_FREE_RATE);
  const futureValue = principal * Math.exp(rate*years);
  return futureValue;
}