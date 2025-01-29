const BASE_URL = 'http://localhost:5001/api';

export const investmentService = {
  async addInvestment(investmentData, token) {
    const response = await fetch(`${BASE_URL}/investments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(investmentData)
    });
    return response.json();
  }
};