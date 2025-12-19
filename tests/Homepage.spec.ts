import { test, expect } from '@playwright/test';
import { Homepage } from '../page/Homepage';

test.describe('The Internet - Homepage POM Tests (TypeScript)', () => {
    let homepage: Homepage;
    
    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        await homepage.goto();
    });

    test('TC01 - Verify the Title and Heading', async ({ page }) => {
        // Assert Title trình duyệt
        await expect(page).toHaveTitle('The Internet');

        // Assert thông qua locator được định nghĩa trong POM
        await expect(homepage.mainHeading).toBeVisible();
        await expect(homepage.mainHeading).toHaveText('Welcome to the-internet');
    });

    test('TC-03: Verify Links Count', async () => {
        // PHẢI CÓ ngoặc đơn () sau tên hàm
        const count = await homepage.getLinksCount(); 
        console.log(`Total links found: ${count}`);
        
        expect(count).toBeGreaterThan(40);
    });

    test('TC-04: Navigate to A/B Testing page', async ({ page }) => {
        await homepage.clickLinkByText('A/B Testing');
        
        await expect(page).toHaveURL(/.*abtest/);
        const subHeading = page.locator('h3');
        await expect(subHeading).toContainText('A/B Test');
    });

    test('TC-05: Verify Footer Link and Attribute', async () => {
        await expect(homepage.footerLink).toBeVisible();
        await expect(homepage.footerLink).toHaveAttribute('href', 'http://elementalselenium.com/');
    });
});