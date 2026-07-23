import { Page, Locator, expect } from '@playwright/test';

export class ElementSite {
  readonly page: Page;
  readonly helperText: Locator;
  readonly textBoxItem: Locator;
  readonly checkBoxItem: Locator;

  constructor(page: Page) {
    this.page = page;
    // Target the actual text visible on initial load
    this.helperText = page.locator('text=Please select an item from left to start practice.');
    this.textBoxItem = page.locator('text=Text Box');
    this.checkBoxItem = page.locator('text=Check Box');
  }

  async verifyElementsPageLoaded() {
    await expect(this.page).toHaveURL(/.*elements/);
    await expect(this.helperText).toBeVisible(); 
  }

  async clickTextBoxItem() {
    await this.textBoxItem.click();
  }

  async clickCheckBoxItem() {
    await this.checkBoxItem.click();
  }
}