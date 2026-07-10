const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const gameConfig = {
    initialBalance: 1000,
    minBet: 10,
    maxBet: 100,
    symbols: ['🍒', '🍋', '🍇', '⭐', '🔔', '💎']
};

// returns the current status of the server
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Mini Slot QA server is running'
    });
});

// returns the basic slot game configuration
app.get('/api/game-config', (req, res) => {
    res.json(gameConfig);
});

// serves static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Mini Slot QA is running on http://localhost:${PORT}`);
});