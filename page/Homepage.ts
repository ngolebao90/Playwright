import { Page, Locator } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    readonly url: string = 'https://the-internet.herokuapp.com/';
    readonly mainHeading: Locator;
    readonly footerLink: Locator;
    readonly allLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = page.locator('h1.heading');
        this.footerLink = page.locator('text=Elemental Selenium');
        this.allLinks = page.locator('ul li a');
    }

    async goto() {
        // ĐÚNG: await [khoảng trắng] this...
        await this.page.goto(this.url);
    }

    async clickLinkByText(text: string) {
        await this.page.click(`text=${text}`);
    }

    async getLinksCount(): Promise<number> {
        return await this.allLinks.count();
    }
}