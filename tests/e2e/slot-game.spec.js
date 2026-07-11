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