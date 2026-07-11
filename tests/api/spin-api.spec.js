const { test, expect } = require('@playwright/test');

test('health endpoint returns server status', async ({ request }) => {
    const response = await request.get('/api/health');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.status).toBe('ok');
    expect(body.message).toBe('Mini Slot QA server is running');
});

test('game config endpoint returns slot configuration', async ({ request }) => {
    const response = await request.get('/api/game-config');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.initialBalance).toBe(1000);
    expect(body.minBet).toBe(10);
    expect(body.maxBet).toBe(100);
    expect(body.symbols).toHaveLength(6);
    expect(body.symbols).toContain('🍒');
});

test('spin endpoint returns a valid spin result', async ({ request }) => {
    const response = await request.post('/api/spin', {
        data: {
            balance: 1000,
            bet: 10
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.result).toHaveLength(3);
    expect(body.bet).toBe(10);
    expect(body.balanceBefore).toBe(1000);
    expect(body.balanceAfter).toBe(1000 - 10 + body.win);
    expect(typeof body.win).toBe('number');
    expect(typeof body.isWin).toBe('boolean');
});

test('spin endpoint rejects spin when balance is too low', async ({ request }) => {
    const response = await request.post('/api/spin', {
        data: {
            balance: 5,
            bet: 10
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBe('Not enough credits');
});