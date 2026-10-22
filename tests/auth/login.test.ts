import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';

test.describe('Authentication Tests', () => {

    test.skip('AUTH-01: Register a new valid customer using unique test data', async ({page})=>{
        const registerPage = new RegisterPage(page);

        await test.step("Navigate to Registration page", async()=>{
            await registerPage.navigate();
        })

        await test.step("Enter User Data", async()=>{
            await registerPage.FillRegisterForm({
                Fname: "Sontu",
                Lname: "Maity",
                email: `sontu.maity@example.com`,
                telephone: "9134567890",
                password: "TestPassword123!",
            })
            await registerPage.CkechPolicyBtn();
            await registerPage.ClickConfirmBtn();
        })

        await test.step("Validate New user", async()=>{
            await registerPage.CheckURLonSuccessPage();
        })
    })

    test.skip('AUTH-02: Registration with all required fields blank', async ({page})=>{
        const registerPage = new RegisterPage(page);

        await test.step('navigate to Register page', async()=>{
            await registerPage.navigate();
        })

        await test.step('fill empty data', async()=>{
            await registerPage.FillRegisterForm({
                Fname: "",
                Lname: "",
                email: ``,
                telephone: "",
                password: "",
            })
            await registerPage.ClickConfirmBtn();
        })

        await test.step('Check Url position', async()=>{
            await registerPage.CheckURLonRegisterPage();
        })
    })

    test.skip('AUTH-03: Invalid email format is rejected', async ({page})=>{
        const registerPage = new RegisterPage(page);

        await test.step('navigate to Register page', async()=>{
            await registerPage.navigate();
        })

        await test.step('Fill user details with Invalid email', async()=>{
            await registerPage.FillRegisterForm({
                Fname: "Sontu",
                Lname: "Maity",
                email: `sontu.maityexample.com`,
                telephone: "9134567890",
                password: "TestPassword123!",
            })
            await registerPage.CkechPolicyBtn();
            await registerPage.ClickConfirmBtn();
        });

        await test.step('Check Url position', async()=>{
            await registerPage.CheckURLonRegisterPage();
        })

    })

    test('AUTH-04: Invalid email format is rejected', async ({page})=>{
        const registerPage = new RegisterPage(page);

        await test.step('navigate to Register page', async()=>{
            await registerPage.navigate();
        })

        await test.step('Fill user details with Invalid email', async()=>{
            await registerPage.FillRegisterForm({
                Fname: "Sontu",
                Lname: "Maity",
                email: `sontu.maityexample.com`,
                telephone: "9134567890",
                password: "TestPassword123!",
            })
            await registerPage.CkechPolicyBtn();
            await registerPage.ClickConfirmBtn();
        });

        await test.step('Check Url position', async()=>{
            await registerPage.CheckURLonRegisterPage();
        })

    })


    test.skip('AUTH-08: Empty login credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        //console.log("url:", baseURL)
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
