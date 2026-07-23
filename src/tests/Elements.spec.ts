import {test, expect, Page, Locator} from '@playwright/test';
import { ElementSite } from '../page/ElementSite';

test.describe('Elements Page Tests', () => {
  let elementSite: ElementSite;
  
  test.beforeEach(async ({ page }) => {
    elementSite = new ElementSite(page);
    await page.goto('/elements');
  });

  test('1. Verify Elements Page Loaded', async () => {
    await elementSite.verifyElementsPageLoaded();
  });

  test('2. Click Text Box Item', async () => {
    await elementSite.clickTextBoxItem();
    await expect(elementSite.page).toHaveURL(/.*text-box/);
  });

  test('3. Click Check Box Item', async () => {
    await elementSite.clickCheckBoxItem();
    await expect(elementSite.page).toHaveURL(/.*checkbox/);
  });
});