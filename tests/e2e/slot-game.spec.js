const { test, expect } = require('@playwright/test');

test('loads the slot game page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Mini Slot QA');
    await expect(page.getByRole('heading', { name: 'Mini Slot QA' })).toBeVisible();

    await expect(page.getByTestId('balance')).toHaveText('1000');
    await expect(page.getByTestId('bet')).toHaveText('10');
    await expect(page.getByTestId('spin-button')).toBeEnabled();

    await expect(page.getByTestId('message')).toHaveText('Game loaded. Click spin to start.');
});

test('allows player to change bet and spin', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('message')).toHaveText('Game loaded. Click spin to start.');

    await page.getByTestId('increase-bet').click();

    await expect(page.getByTestId('bet')).toHaveText('20');
    await expect(page.getByTestId('message')).toHaveText('Bet increased to 20 credits.');

    await page.getByTestId('decrease-bet').click();

    await expect(page.getByTestId('bet')).toHaveText('10');
    await expect(page.getByTestId('message')).toHaveText('Bet decreased to 10 credits.');

    await page.getByTestId('spin-button').click();

    await expect(page.getByTestId('message')).toHaveText(/You won \d+ credits!|No win this time\. Try again!/);
    await expect(page.getByTestId('balance')).not.toHaveText('1000');

    await expect(page.getByTestId('reel-1')).not.toHaveText('');
    await expect(page.getByTestId('reel-2')).not.toHaveText('');
    await expect(page.getByTestId('reel-3')).not.toHaveText('');
});