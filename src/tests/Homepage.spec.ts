import { test, expect } from '@playwright/test';
import { Homepage } from '../page/Homepage';

test.describe('DemoQA Homepage Navigation Actions', () => {
  
  // Dùng beforeEach để khởi tạo Homepage và goto() một lần cho tất cả các test
  let homePage: Homepage;

  test.beforeEach(async ({ page }) => {
    homePage = new Homepage(page);
    await homePage.goto();
  });

  test('1. High priority: Click logo returns to homepage', async () => {
    await expect(homePage.logo).toBeVisible();
    await homePage.logo.click();
  });

  test('2. High priority: Count number of category items', async () => {
    const count = await homePage.countNumberOfCategoryCards();
    expect(count).toBeGreaterThan(0);
  });

  test('3. Medium priority: Clicking banner links opens new tab', async ({ page }) => {
    await expect(homePage.seleniumTrainingLink).toBeVisible();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      homePage.seleniumTrainingLink.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toContain('toolsqa.com');
    await newPage.close();
  });

  test('4. Medium priority: Click Join Now button opens in new tab', async ({ context }) => {
    await expect(homePage.joinNowButton).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.joinNowButton.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toContain('toolsqa.com');
    await newPage.close();
  });

 test('5. High priority: Click and verify each Category Card', async ({ page }) => {
    const count = await homePage.countNumberOfCategoryCards();

    for (let i = 0; i < count; i++) {
      // 1. Click card
      await homePage.clickCategoryByIndex(i);

      // 2. Đợi trang load và kiểm tra phần tử sidebar hoặc nội dung bên phải hiển thị
      const sidebarMenu = page.locator('.left-pannel');
      await expect(sidebarMenu).toBeVisible({ timeout: 10000 });

      // 3. Quay lại trang chủ
      await page.goBack();
      
      // Đợi trang chủ sẵn sàng
      await expect(homePage.categoryCards.first()).toBeVisible();
      
      // Xóa quảng cáo nếu nó hiện lại
      await page.evaluate(() => {
        const banner = document.querySelector('div[id^="fixedban"]');
        if (banner) banner.remove();
      });
    }
  });

  test('6. Low priority: Verify footer text content', async () => {
    await expect(homePage.footer).toBeVisible();
    await homePage.VerifyFooterText('© 2013-2026 TOOLSQA.COM | ALL RIGHTS RESERVED.');
  });
});