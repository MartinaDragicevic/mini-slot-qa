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

test('shows winning result when spin API returns a win', async ({ page }) => {
    await page.route('**/api/spin', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                result: ['💎', '💎', '💎'],
                bet: 10,
                win: 100,
                balanceBefore: 1000,
                balanceAfter: 1090,
                isWin: true
            })
        });
    });

    await page.goto('/');

    await expect(page.getByTestId('message')).toHaveText('Game loaded. Click spin to start.');

    await page.getByTestId('spin-button').click();

    await expect(page.getByTestId('reel-1')).toHaveText('💎');
    await expect(page.getByTestId('reel-2')).toHaveText('💎');
    await expect(page.getByTestId('reel-3')).toHaveText('💎');

    await expect(page.getByTestId('balance')).toHaveText('1090');
    await expect(page.getByTestId('message')).toHaveText('You won 100 credits!');
});

test('shows error message when spin API fails', async ({ page }) => {
    await page.route('**/api/spin', async (route) => {
        await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({
                error: 'Not enough credits'
            })
        });
    });

    await page.goto('/');

    await expect(page.getByTestId('message')).toHaveText('Game loaded. Click spin to start.');

    await page.getByTestId('spin-button').click();

    await expect(page.getByTestId('message')).toHaveText('Not enough credits');
});