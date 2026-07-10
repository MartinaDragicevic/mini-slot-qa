let symbols = [];

let balance = 0;
let bet = 0;

let minBet = 10;
let maxBet = 100;

const balanceElement = document.querySelector('[data-testid="balance"]');
const betElement = document.querySelector('[data-testid="bet"]');

const reel1 = document.querySelector('[data-testid="reel-1"]');
const reel2 = document.querySelector('[data-testid="reel-2"]');
const reel3 = document.querySelector('[data-testid="reel-3"]');

const spinButton = document.querySelector('[data-testid="spin-button"]');
const increaseBetButton = document.querySelector('[data-testid="increase-bet"]');
const decreaseBetButton = document.querySelector('[data-testid="decrease-bet"]');

const messageElement = document.querySelector('[data-testid="message"]');

// disables all game buttons until the configuration is loaded
function disableGameControls() {
    spinButton.disabled = true;
    increaseBetButton.disabled = true;
    decreaseBetButton.disabled = true;
}

// loads the game configuration from the backend api
async function loadGameConfig() {
    const response = await fetch('/api/game-config');

    if (!response.ok) {
        throw new Error('Failed to load game configuration.');
    }

    return await response.json();
}

// sends the current balance and bet to the backend spin api
async function requestSpinResult() {
    const response = await fetch('/api/spin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            balance: balance,
            bet: bet
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to spin.');
    }

    return data;
}

// updates the balance and bet values displayed on the page
// disables buttons that the player cannot use
function updateDisplay() {
    balanceElement.textContent = balance;
    betElement.textContent = bet;

    decreaseBetButton.disabled = bet <= minBet;
    increaseBetButton.disabled = bet >= maxBet || bet + 10 > balance;
    spinButton.disabled = balance < bet;
}

// updates the three reels with symbols returned from the backend
function updateReels(result) {
    reel1.textContent = result[0];
    reel2.textContent = result[1];
    reel3.textContent = result[2];
}

// runs one spin round using the backend api
// it sends the current game state to the server and updates the page with the response
async function spin() {
    if (balance < bet) {
        messageElement.textContent = 'Not enough credits to spin.';
        return;
    }

    spinButton.disabled = true;
    messageElement.textContent = 'Spinning...';

    try {
        const spinResult = await requestSpinResult();

        balance = spinResult.balanceAfter;
        updateReels(spinResult.result);

        if (spinResult.isWin) {
            messageElement.textContent = `You won ${spinResult.win} credits!`;
        } else {
            messageElement.textContent = 'No win this time. Try again!';
        }

        updateDisplay();
    } catch (error) {
        messageElement.textContent = error.message;
        console.error(error);
        updateDisplay();
    }
}

// increases the bet by 10 credits
// the bet cannot go over the maximum bet or over the current balance
function increaseBet() {
    if (bet >= maxBet) {
        messageElement.textContent = 'Maximum bet is already selected.';
        return;
    }

    if (bet + 10 > balance) {
        messageElement.textContent = 'Not enough credits to increase bet.';
        return;
    }

    bet = bet + 10;
    messageElement.textContent = `Bet increased to ${bet} credits.`;
    updateDisplay();
}

// decreases the bet by 10 credits
// the bet cannot go below the minimum bet
function decreaseBet() {
    if (bet <= minBet) {
        messageElement.textContent = 'Minimum bet is already selected.';
        return;
    }

    bet = bet - 10;
    messageElement.textContent = `Bet decreased to ${bet} credits.`;
    updateDisplay();
}

// initializes the game by loading backend configuration and preparing the page
async function initGame() {
    disableGameControls();

    try {
        const config = await loadGameConfig();

        symbols = config.symbols;
        balance = config.initialBalance;
        bet = config.minBet;
        minBet = config.minBet;
        maxBet = config.maxBet;

        messageElement.textContent = 'Game loaded. Click spin to start.';
        updateDisplay();
    } catch (error) {
        messageElement.textContent = 'Could not load game configuration.';
        console.error(error);
    }
}

spinButton.addEventListener('click', spin);
increaseBetButton.addEventListener('click', increaseBet);
decreaseBetButton.addEventListener('click', decreaseBet);

initGame();