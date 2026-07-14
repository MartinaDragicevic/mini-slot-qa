# Example Bug Report

## Title

Spin button allows request when balance is lower than selected bet

## Summary

The user should not be able to start a spin if the current balance is lower than the selected bet.

If this validation fails, the frontend could send an invalid spin request to the backend.

## Environment

- Application: Mini Slot QA Project
- Browser: Chromium
- Test type: Manual / E2E
- Page: Slot game main page
- URL: http://localhost:3000

## Preconditions

- The application is running locally
- The user is on the main slot game page
- The game configuration is loaded
- Initial balance and bet are displayed

## Steps to reproduce

1. Open the application at http://localhost:3000
2. Wait until the game is loaded
3. Set the bet value higher than the available balance
4. Click the Spin button

## Expected result

The Spin button should be disabled when the selected bet is higher than the current balance.

The user should not be able to send an invalid spin request.

## Actual result

The Spin button is clickable and the application sends a spin request even though the balance is too low.

## Severity

Medium

## Priority

High

## Reason

This issue affects the main game flow and can cause invalid API requests.

In a real slot game, balance and bet validation is important because the user must not be able to play with more credits than available.

## Suggested fix

Disable the Spin button when:

```js
balance < bet
```

Also keep backend validation in the POST /api/spin endpoint to reject invalid requests.

## Related test idea

Add an automated test that checks:

- Spin button is disabled when balance is lower than bet
- POST /api/spin returns 400 when balance is too low
- frontend displays a clear error message when the spin API rejects the request