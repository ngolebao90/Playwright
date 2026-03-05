import { Page,Locator } from "@playwright/test"; 
export class AddRemoveElementPage {
    readonly page: Page;
    readonly url: string = 'https://the-internet.herokuapp.com/add_remove_elements/';
    readonly addButton: Locator;
    readonly deleteButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addButton = page.locator('button[onclick="addElement()"]');
        this.deleteButtons = page.locator('button[onclick="deleteElement()"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickAddButton(times: number = 1) {
        for (let i = 0; i < times; i++) {
            await this.addButton.click();
        }
    }

    async getDeleteButtonsCount(): Promise<number> {
        return await this.deleteButtons.count();
    }

    async clickDeleteButton(index: number = 0) {
        const count = await this.getDeleteButtonsCount();
        if (index < count) {
            await this.deleteButtons.nth(index).click();
        } else {
            throw new Error(`Index ${index} is out of bounds. Total delete buttons: ${count}`);
        }
    }
}   