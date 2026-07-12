# Mini Slot QA Project

Mini Slot QA Project is a small web application created while learning QA automation.

The project contains a simple slot game with a frontend, backend API and automated tests written with Playwright.

## Project goal

The goal of this project is not to build a complex slot game, but to show a basic QA automation workflow:

- build a simple web application
- add backend API endpoints
- test the UI with Playwright E2E tests
- test the API directly with Playwright API tests
- mock API responses for controlled test scenarios
- run tests locally and with GitHub Actions

## Technologies used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Playwright
- GitHub Actions

## Features

- simple slot game UI
- balance and bet controls
- spin button
- backend game configuration endpoint
- backend spin endpoint
- random spin result
- win and no-win messages
- frontend error handling
- automated E2E tests
- automated API tests
- GitHub Actions workflow

## API endpoints

### GET /api/health

Checks if the server is running.

Example response:

```json
{
  "status": "ok",
  "message": "Mini Slot QA server is running"
}
```

### GET /api/game-config

Returns basic game configuration, such as initial balance, minimum bet, maximum bet and slot symbols.

Example response:

```json
{
  "initialBalance": 1000,
  "minBet": 10,
  "maxBet": 100,
  "symbols": ["🍒", "🍋", "🍇", "⭐", "🔔", "💎"]
}
```

### POST /api/spin

Returns one spin result based on the current balance and selected bet.

Example request:

```json
{
  "balance": 1000,
  "bet": 10
}
```

Example response:

```json
{
  "result": ["🍒", "🍋", "💎"],
  "bet": 10,
  "win": 0,
  "balanceBefore": 1000,
  "balanceAfter": 990,
  "isWin": false
}
```

## How to run the project

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Open in browser:

```text
http://localhost:3000
```

## How to run tests

Run all tests:

```bash
npm test
```

Run only E2E tests:

```bash
npm run test:e2e
```

Run only API tests:

```bash
npm run test:api
```

Run tests in headed mode:

```bash
npm run test:headed
```

## Test coverage

The project currently includes tests for:

- loading the slot game page
- changing the bet value
- spinning the slot game
- displaying a mocked winning result
- displaying an error when the spin API fails
- checking the health endpoint
- checking the game configuration endpoint
- checking valid spin API response
- checking spin API validation when balance is too low

## GitHub Actions

The project includes a GitHub Actions workflow that runs Playwright tests automatically on push and pull request to the main branch.

Workflow file:

```text
.github/workflows/playwright.yml
```

## What I practiced in this project

Through this project I practiced:

- basic frontend structure
- backend API creation with Express
- frontend-backend communication
- writing Playwright E2E tests
- writing Playwright API tests
- mocking API responses
- using Git and GitHub
- creating meaningful commits
- running tests automatically with GitHub Actions