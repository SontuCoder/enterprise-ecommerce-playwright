import {Page, Locator} from "@playwright/test"

export class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page){
        this.page = page;

        this.emailInput = page.locator("#input-email");
        this.passwordInput = page.locator("#input-password");
        this.loginBtn = page.locator('//*[@id="content"]/div/div[2]/div/div/form/input');
    }
    
    async navigate(): Promise<void>{
        await this.page.goto("index.php?route=account/login")
    }

    async login(email: string, password: string): Promise<void>{
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click()
    }

}