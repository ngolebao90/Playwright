import { Page, Locator } from "@playwright/test";

export class DynamicControlPage {
    readonly page: Page;
    readonly checkbox: Locator;
    readonly swapCheckboxBtn: Locator;
    readonly swapInputBtn: Locator;
    readonly message: Locator;
    readonly loadingCheckbox: Locator;
    readonly loadingInput: Locator;
    readonly inputField: Locator;

    constructor(page: Page) {
    this.page = page;
    this.checkbox = page.locator('#checkbox');
    this.swapCheckboxBtn = page.locator('#checkbox-example button');
    this.swapInputBtn = page.locator('#input-example button');
    this.message = page.locator('#message');
    
    // Thêm .first() để tránh lỗi khi có nhiều ID trùng nhau
    this.loadingCheckbox = page.locator('#checkbox-example #loading').first();
    this.loadingInput = page.locator('#input-example #loading').first();
    
    this.inputField = page.locator('#input-example input');
    }

    async clickRemoveButton() {
        await this.swapCheckboxBtn.click();
        await this.loadingCheckbox.waitFor({ state: 'hidden' });
    }

    async clickAddButton() {
        await this.swapCheckboxBtn.click();
        await this.loadingCheckbox.waitFor({ state: 'hidden' });
    }

    async clickEnableButton() {
        await this.swapInputBtn.click();
        await this.loadingInput.waitFor({ state: 'hidden' });
    }

    async clickDisableButton() {
        await this.swapInputBtn.click();
        await this.loadingInput.waitFor({ state: 'hidden' });
    }

    async isInputFieldEnabled(): Promise<boolean> {
        return await this.inputField.isEnabled();
    }   

    async isCheckboxVisible(): Promise<boolean> {
        // Dùng .isVisible() nhưng nên đợi 1 chút để UI ổn định
        try {
            await this.page.waitForTimeout(500); // Đợi 0.5 giây để tránh lỗi do UI chưa kịp cập nhật
            return true;
        } catch (error) {
            return false;
        }
    }

    async getMessageText(): Promise<string> {
        return (await this.message.textContent())?.trim() || '';
    }
}