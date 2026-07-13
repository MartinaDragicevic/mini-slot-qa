# QA Test Plan

## Project

Mini Slot QA Project

## Purpose

The purpose of this test plan is to describe what should be tested in the Mini Slot QA application.

The application contains a simple slot game, backend API endpoints and automated tests written with Playwright.

## Test scope

The testing scope includes:

- basic page loading
- balance display
- bet display
- bet increase and decrease controls
- spin button behavior
- backend game configuration
- backend spin result
- frontend error handling
- API validation
- mocked API responses

## Out of scope

The following items are not covered in this small project:

- real user authentication
- real money transactions
- database testing
- advanced slot math
- performance testing
- mobile device testing

## Test types

### Smoke testing

Smoke tests check that the main page loads and that the basic UI elements are visible.

Example:

- open the application
- check page title
- check heading
- check initial balance
- check initial bet
- check spin button

### E2E testing

E2E tests simulate user behavior in the browser.

Examples:

- user opens the game
- user increases the bet
- user decreases the bet
- user clicks the spin button
- user sees win or no-win message

### API testing

API tests check backend endpoints directly without using the browser.

Covered endpoints:

- GET /api/health
- GET /api/game-config
- POST /api/spin

### Negative testing

Negative tests check how the application behaves when something goes wrong.

Examples:

- spin is rejected when balance is too low
- frontend shows an error message when spin API fails

### Mock testing

Mocked tests are used for controlled scenarios where the real API response is random.

Example:

- mock /api/spin response to return three same symbols
- check that frontend displays winning result

## Test data

Basic test data used in this project:

```json
{
  "balance": 1000,
  "bet": 10
}
```

Invalid test data example:

```json
{
  "balance": 5,
  "bet": 10
}
```

## Risks

Possible risks in a slot game application:

- balance is calculated incorrectly
- frontend shows a different result than backend returns
- bet can go outside allowed limits
- API returns invalid data
- user does not see clear error messages
- random results make tests unstable

## Tools

- Playwright for E2E and API tests
- Node.js and Express for backend
- GitHub Actions for running tests automatically

## Current automated test coverage

The current automated tests cover:

- page loading
- bet controls
- spin flow
- mocked winning result
- mocked API error
- health endpoint
- game configuration endpoint
- valid spin API response
- invalid spin API response when balance is too low