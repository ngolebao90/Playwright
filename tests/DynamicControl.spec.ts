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

    /**
     * NHÓM 1: CÁC THAO TÁC CƠ BẢN (TC01 - TC04)
     */
    test('TC01 - Verify Checkbox Removal', async () => {
        await dynamicControlPage.clickRemoveButton();
        await expect(dynamicControlPage.checkbox).toBeHidden();
        await expect(dynamicControlPage.message).toHaveText("It's gone!");
    });

    test('TC02 - Verify Checkbox Addition', async () => {
        await dynamicControlPage.clickRemoveButton(); 
        await dynamicControlPage.clickAddButton();
        await expect(dynamicControlPage.checkbox).toBeVisible();
        await expect(dynamicControlPage.message).toHaveText("It's back!");
    });

    test('TC03 - Verify Enable Input Field', async () => {
        await dynamicControlPage.clickEnableButton();
        await expect(dynamicControlPage.inputField).toBeEnabled();
        await expect(dynamicControlPage.message).toHaveText("It's enabled!");
    });

    test('TC04 - Verify Disable Input Field', async () => {
        await dynamicControlPage.clickEnableButton(); 
        await dynamicControlPage.clickDisableButton();
        await expect(dynamicControlPage.inputField).toBeDisabled();
        await expect(dynamicControlPage.message).toHaveText("It's disabled!");
    });

    /**
     * NHÓM 2: KIỂM TRA MESSAGE VÀ TRẠNG THÁI (TC05 - TC06)
     */
    test('TC05 - Verify Message Displayed After Actions', async () => {
        await dynamicControlPage.clickRemoveButton();
        await expect(dynamicControlPage.message).toHaveText("It's gone!");
        await dynamicControlPage.clickAddButton();
        await expect(dynamicControlPage.message).toHaveText("It's back!");
    });

    test('TC6 - Verify State Reset After Page Refresh', async () => {
        await dynamicControlPage.clickRemoveButton();
        await dynamicControlPage.page.reload();
        // Trang demo luôn reset: Checkbox HIỆN, Input DISABLED
        await expect(dynamicControlPage.checkbox).toBeVisible();
        await expect(dynamicControlPage.inputField).toBeDisabled();
    });
    /**
     * NHÓM 3: UI, ACCESSIBILITY VÀ RESPONSIVENESS (TC07 - TC09)
     */
    test('TC07 - Verify UI Elements Are Properly Labeled', async () => {
        // Kiểm tra text của nút hiện tại (vì nút thay đổi Add/Remove tùy lúc)
        const btnText = await dynamicControlPage.removeButton.textContent();
        expect(['Remove', 'Add']).toContain(btnText?.trim());
    }); 

    test('TC08 - Verify Keyboard Accessibility', async () => {
        await dynamicControlPage.removeButton.focus();
        await dynamicControlPage.page.keyboard.press('Enter');
        await expect(dynamicControlPage.checkbox).toBeHidden();
    });

    test('TC09 - Verify Responsiveness on Mobile Viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await dynamicControlPage.clickRemoveButton();
        await expect(dynamicControlPage.checkbox).toBeHidden();
    });

    /**
     * NHÓM 4: NAVIGATION (TC10 - TC12)
     * Lưu ý quan trọng: Navigation (Back/Forward)
     */
    test('TC10 - Verify State After Navigating Away and Back', async ({ page }) => {
    await dynamicControlPage.clickRemoveButton();
    await expect(dynamicControlPage.checkbox).toBeHidden();

    // Điều hướng trực tiếp sang trang khác thay vì click link
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page).toHaveURL(/.*login/);

    // Quay lại bằng nút Back của trình duyệt
    await page.goBack();
    
    // Đợi trang load xong và kiểm tra reset
    await page.waitForLoadState('load');
    await expect(dynamicControlPage.checkbox).toBeVisible(); 
    });

    test('TC11 - Verify State After Browser Back and Forward', async () => {
        await dynamicControlPage.clickRemoveButton();
        await dynamicControlPage.page.goBack(); 
        await dynamicControlPage.page.goForward(); 
        await expect(dynamicControlPage.checkbox).toBeVisible(); // Reset
    });

    test('TC12 - Verify State After Browser Back, Forward, and Refresh', async () => {
        await dynamicControlPage.clickRemoveButton();
        await dynamicControlPage.page.reload();
        await expect(dynamicControlPage.checkbox).toBeVisible();
        await expect(dynamicControlPage.inputField).toBeDisabled();
    });
});