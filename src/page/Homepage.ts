import { expect, Locator, Page } from "@playwright/test";

export class Homepage {
  readonly page: Page;
  readonly categoryCards: Locator; 
  readonly homeBanner: Locator;
  readonly logo: Locator;
  readonly footer: Locator;
  readonly joinNowButton: Locator;
  readonly seleniumTrainingLink: Locator;
  readonly footerText: Locator;

  constructor(page: Page) {
    this.page = page;
    // Target the individual card elements, not just the container
    this.categoryCards = page.locator('.category-cards .card'); 
    this.homeBanner = page.locator('.home-banner');
    this.logo = page.getByRole('link').filter({ has: page.getByRole('img') }).first();
    this.footer = page.locator('footer');
    this.footerText = this.footer.locator('span');
    this.joinNowButton = page.getByRole('link', { name: 'Selenium Online Training' });
    this.seleniumTrainingLink = page.getByRole('link', { name: 'Selenium Online Training' });
  }

  async goto() {
    await this.page.goto('/');
  }

  // Improved counting method
  async countNumberOfCategoryCards(): Promise<number> {
    return await this.categoryCards.count();
  }

  // Handle new tabs properly in the test logic (example below)
  async clickSeleniumTraining() {
    // We return the promise of a new page to handle the tab
    return this.page.context().waitForEvent('page');
  }

  async VerifyFooterText(expectedText: string) {
    await expect(this.footerText).toHaveText(expectedText);
  }

  async clickCategoryByIndex(index: number) {
  const card = this.categoryCards.nth(index);
  await card.scrollIntoViewIfNeeded(); // Giúp tránh lỗi bị che bởi quảng cáo
  await card.click();
}
}