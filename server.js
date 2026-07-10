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

app.use(express.json());

// returns one random symbol from the game configuration
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * gameConfig.symbols.length);
    return gameConfig.symbols[randomIndex];
}

// creates one spin result with three symbols
function generateSpinResult() {
    return [
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol()
    ];
}

// calculates the win amount for a spin result
function calculateWin(result, bet) {
    const first = result[0];
    const second = result[1];
    const third = result[2];

    if (first === second && second === third) {
        return bet * 10;
    }

    if (first === second || first === third || second === third) {
        return bet * 2;
    }

    return 0;
}

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

// returns one spin result based on the current balance and selected bet
app.post('/api/spin', (req, res) => {
    const { balance, bet } = req.body;

    if (typeof balance !== 'number' || typeof bet !== 'number') {
        return res.status(400).json({
            error: 'Balance and bet must be numbers'
        });
    }

    if (bet < gameConfig.minBet || bet > gameConfig.maxBet) {
        return res.status(400).json({
            error: 'Bet is outside allowed limits'
        });
    }

    if (bet > balance) {
        return res.status(400).json({
            error: 'Not enough credits'
        });
    }

    const result = generateSpinResult();
    const win = calculateWin(result, bet);
    const finalBalance = balance - bet + win;

    res.json({
        result,
        bet,
        win,
        balanceBefore: balance,
        balanceAfter: finalBalance,
        isWin: win > 0
    });
});

// serves static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// starts the local development server
app.listen(PORT, () => {
    console.log(`Mini Slot QA is running on http://localhost:${PORT}`);
});