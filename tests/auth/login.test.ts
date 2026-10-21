
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication Tests', () => {

    test('AUTH-01: Register a new valid customer using unique test data')

    test('AUTH-08: Empty login credentials @negative', async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        console.log("url:", baseURL)
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate();
        });

        await test.step('Submit empty credentials', async () => {
            await loginPage.login('', '');
        });

        await test.step('Verify login is rejected', async () => {
            await expect(page).toHaveURL(/route=account(?:\/|%2F)login/i);
        });

    });


});
