import { Page, Locator } from "@playwright/test";

export class DynamicControlPage {
    readonly page: Page;
    readonly checkbox: Locator;
    readonly removeButton: Locator;
    readonly addButton: Locator;
    readonly enableButton: Locator;
    readonly disableButton: Locator;
    readonly message: Locator;
    readonly loadingCheckbox: Locator;
    readonly loadingInput: Locator;
    readonly inputField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkbox = page.locator('#checkbox');
        this.message = page.locator('#message');
        this.inputField = page.locator('#input-example input');
        // Nút bấm thay đổi text nhưng selector không đổi
        this.removeButton = page.locator('#checkbox-example button');
        this.addButton = page.locator('#checkbox-example button');
        this.enableButton = page.locator('#input-example button');
        this.disableButton = page.locator('#input-example button');
        // Sử dụng .first() để tránh lỗi strict mode do trùng ID loading
        this.loadingCheckbox = page.locator('#checkbox-example #loading').first();
        this.loadingInput = page.locator('#input-example #loading').first();
    }

    async goto() {
        await this.page.goto('/dynamic_controls');
    }

    private async waitForLoading(loadingLocator: Locator) {
        await loadingLocator.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
        await loadingLocator.waitFor({ state: 'hidden', timeout: 20000 });
    }

    async clickRemoveButton() {
        await this.removeButton.click();
        await this.waitForLoading(this.loadingCheckbox);
    }

    async clickAddButton() {
        await this.addButton.click();
        await this.waitForLoading(this.loadingCheckbox);
    }

    async clickEnableButton() {
        await this.enableButton.click();
        await this.waitForLoading(this.loadingInput);
    }

    async clickDisableButton() {
        await this.disableButton.click();
        await this.waitForLoading(this.loadingInput);
    }
}