import { expect, Locator, Page } from "@playwright/test"

export interface FormData {
    Fname: string
    Lname: string
    email: string
    telephone: string
    password: string
}


export class RegisterPage{

    readonly page: Page;
    readonly FNameInput: Locator;
    readonly LNameInput: Locator;
    readonly EmailInput: Locator;
    readonly TelephInput: Locator;
    readonly PassInput: Locator;
    readonly CPassInput: Locator;
    readonly PolicyInput: Locator;
    readonly ContinueBtn: Locator;
    readonly PolicyLabel: Locator;
    readonly WarningLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.FNameInput = this.page.locator("#input-firstname")
        this.LNameInput = this.page.locator("#input-lastname")
        this.EmailInput = this.page.locator("#input-email")
        this.TelephInput = this.page.locator("#input-telephone")
        this.PassInput = this.page.locator("#input-password")
        this.CPassInput = this.page.locator("#input-confirm")
        this.PolicyInput = this.page.locator('#input-agree');
        this.PolicyLabel = this.page.locator('label[for="input-agree"]');
        this.ContinueBtn = this.page.locator('//*[@id="content"]/form/div/div/input');
        this.WarningLabel = this.page.locator('//*[@id="account-register"]/div[1]');
    }

    async navigate(): Promise<void>{
        await this.page.goto("index.php?route=account/register");
    }

    async FillRegisterForm(userdetails : FormData) :Promise<void> {
        await this.FNameInput.fill(userdetails.Fname);
        await this.LNameInput.fill(userdetails.Lname);
        await this.EmailInput.fill(userdetails.email);
        await this.TelephInput.fill("+"+ userdetails.telephone);
        await this.PassInput.fill(userdetails.password);
        await this.CPassInput.fill(userdetails.password);
    }

    async CkechPolicyBtn(): Promise<void> {
        await this.PolicyLabel.click();
        await expect(this.PolicyInput).toBeChecked();
    }

    async ClickConfirmBtn(): Promise<void>{
        await this.ContinueBtn.click();
    }

    async CheckEmptyDetailsWarning(): Promise<void> {
        const text = await this.WarningLabel.textContent();
        expect(text).toContain("You must agree to the Privacy Policy!");
    }

    async CheckURLonRegisterPage():Promise<void> {
        await expect(this.page).toHaveURL(/route=account\/register/i)
    }

    async CheckURLonSuccessPage(): Promise<void>{
        await expect(this.page).toHaveURL(/route=account\/success/i);
    }

}
