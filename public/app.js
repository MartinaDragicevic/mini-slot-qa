const symbols = ['🍒', '🍋', '🍇', '⭐', '🔔', '💎'];

let balance = 1000;
let bet = 10;

const minBet = 10;
const maxBet = 100;

const balanceElement = document.querySelector('[data-testid="balance"]');
const betElement = document.querySelector('[data-testid="bet"]');

const reel1 = document.querySelector('[data-testid="reel-1"]');
const reel2 = document.querySelector('[data-testid="reel-2"]');
const reel3 = document.querySelector('[data-testid="reel-3"]');

const spinButton = document.querySelector('[data-testid="spin-button"]');
const increaseBetButton = document.querySelector('[data-testid="increase-bet"]');
const decreaseBetButton = document.querySelector('[data-testid="decrease-bet"]');

const messageElement = document.querySelector('[data-testid="message"]');

// returns one random symbol from the symbols array
function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
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

// calculates the win amount based on the spin result
// three same symbols give a bigger win, two same symbols give a smaller win
function calculateWin(result) {
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

// runs one spin round
// it checks the balance, generates symbols, calculates the win and updates the page
function spin() {
    if (balance < bet) {
        messageElement.textContent = 'Not enough credits to spin.';
        return;
    }

    balance = balance - bet;

    const result = [
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol()
    ];

    reel1.textContent = result[0];
    reel2.textContent = result[1];
    reel3.textContent = result[2];

    const win = calculateWin(result);
    balance = balance + win;

    if (win > 0) {
        messageElement.textContent = `You won ${win} credits!`;
    } else {
        messageElement.textContent = 'No win this time. Try again!';
    }

    updateDisplay();
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

spinButton.addEventListener('click', spin);
increaseBetButton.addEventListener('click', increaseBet);
decreaseBetButton.addEventListener('click', decreaseBet);

updateDisplay();