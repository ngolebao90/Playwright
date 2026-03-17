import { test, expect } from '@playwright/test';
import { DynamicControlPage } from '../page/DynamicControl';
import { Homepage } from '../page/Homepage';

test.describe('The Internet - Dynamic Control POM Tests (TypeScript)', () => {
    let dynamicControlPage: DynamicControlPage;
    let homepage: Homepage;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        await homepage.goto();
        await homepage.clickLinkByText('Dynamic Controls');
        dynamicControlPage = new DynamicControlPage(page);
    });

    test('TC01 - Verify Checkbox Removal', async () => {
        await dynamicControlPage.clickRemoveButton();
        // Dùng Web-first assertion để tự động đợi checkbox biến mất
        await expect(dynamicControlPage.checkbox).toBeHidden();
        await expect(dynamicControlPage.message).toHaveText("It's gone!");
    });

    test('TC02 - Verify Checkbox Addition', async () => {
        await dynamicControlPage.clickRemoveButton(); // Xóa trước
        await dynamicControlPage.clickAddButton();    // Thêm lại
        
        // Tự động đợi checkbox xuất hiện lại
        await expect(dynamicControlPage.checkbox).toBeVisible();
        await expect(dynamicControlPage.message).toHaveText("It's back!");
    });

    test('TC03 - Verify Enable Input Field', async () => {
        await dynamicControlPage.clickEnableButton();
        
        // Tự động đợi cho đến khi input có thể tương tác (Enabled)
        await expect(dynamicControlPage.inputField).toBeEnabled();
        await expect(dynamicControlPage.message).toHaveText("It's enabled!");
    });

    test('TC04 - Verify Disable Input Field', async () => {
        await dynamicControlPage.clickEnableButton(); // Bật trước
        await dynamicControlPage.clickDisableButton(); // Tắt lại

        // Tự động đợi cho đến khi input không thể tương tác (Disabled)
        await expect(dynamicControlPage.inputField).toBeDisabled();
        await expect(dynamicControlPage.message).toHaveText("It's disabled!");
    });
});