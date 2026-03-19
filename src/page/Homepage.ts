import { Page, Locator } from '@playwright/test';

export class Homepage {
    readonly page: Page;
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
        // Playwright sẽ tự ghép baseURL + '/'
        await this.page.goto('/',{ waitUntil: 'domcontentloaded' });
    }

    async clickLinkByText(text: string) {
        // Đợi link sẵn sàng trước khi click để tránh lỗi TC17
        const link = this.page.locator(`text=${text}`);
        await link.waitFor({ state: 'visible', timeout: 5000 });
        await link.click();
    }

    async getLinksCount(): Promise<number> {
        return await this.allLinks.count();
    }
}