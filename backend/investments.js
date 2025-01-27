const express = require('express');
const router = express.Router();
const Investment = require('/investment');
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: process.env.API_IDENTIFIER,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`
});

// Endpoint for creating a new investment
router.post('/', checkJwt, async (req, res) => {
    try {
        const { fundTicker, quantity, purchaseDate, purchasePrice } = req.body;
        const userId = req.auth.payload.sub; // Auth0 user ID

        const investment = new Investment({
            userId,
            fundTicker,
            quantity,
            purchaseDate,
            purchasePrice
        });

        await investment.save();
        res.status(201).json(investment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for fetching all investments
router.get('/', checkJwt, async (req, res) => {
    try {
        const userId = req.auth.payload.sub;
        const investments = await Investment.find({ userId });
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;