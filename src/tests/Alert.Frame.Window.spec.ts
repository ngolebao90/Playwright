import { test, expect } from '@playwright/test';
import { AlertFrameWindow } from '../page/Alert.Frame.Window';

test.describe('DemoQA - Alerts, Frame & Windows', () => {
    let alertFrameWindow: AlertFrameWindow;

    test.beforeEach(async ({ page }) => {
        alertFrameWindow = new AlertFrameWindow(page);
        await page.goto('/');
        await alertFrameWindow.clickLinkAlertFrameWindow();
    });

    test.describe('Alerts Handling', () => {
        test.beforeEach(async () => {
            await alertFrameWindow.navigateToAlerts();
        });

        test('TC01 - Handle Simple Alert', async ({ page }) => {
            page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('alert');
                expect(dialog.message()).toBe('You clicked a button');
                await dialog.accept();
            });
            await alertFrameWindow.clickAlertButton();
        });

        test('TC02 - Handle Confirm Dialog (Accept & Dismiss)', async ({ page }) => {
            // Case 1: Accept Confirm
            page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm');
                expect(dialog.message()).toBe('Do you confirm action?');
                await dialog.accept();
            });
            await alertFrameWindow.clickConfirmButton();
            await expect(alertFrameWindow.confirmResult).toHaveText('You selected Ok');

            // Case 2: Dismiss (Cancel) Confirm
            page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm');
                await dialog.dismiss();
            });
            await alertFrameWindow.clickConfirmButton();
            await expect(alertFrameWindow.confirmResult).toHaveText('You selected Cancel');
        });

        test('TC03 - Handle Prompt Dialog', async ({ page }) => {
            const promptInput = 'Playwright Automation';
            page.once('dialog', async dialog => {
                expect(dialog.type()).toBe('prompt');
                expect(dialog.message()).toBe('Please enter your name');
                await dialog.accept(promptInput);
            });
            await alertFrameWindow.clickPromptButton();
            await expect(alertFrameWindow.promptResult).toHaveText(`You entered ${promptInput}`);
        });

        test('TC04 - Handle Timer Alert (Appears after 5 seconds)', async ({ page }) => {
            const dialogPromise = page.waitForEvent('dialog');
            await alertFrameWindow.clickTimerAlertButton();

            const dialog = await dialogPromise;
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('This alert appeared after 5 seconds');
            await dialog.accept();
        });
    });

    test.describe('Browser Windows (Tabs & Windows)', () => {
        test.beforeEach(async () => {
            await alertFrameWindow.navigateToBrowserWindows();
        });

        test('TC05 - Handle New Tab', async ({ page }) => {
            const newTabPromise = page.waitForEvent('popup');
            await alertFrameWindow.clickTabButton();
            const newTab = await newTabPromise;
            await newTab.waitForLoadState();

            await expect(newTab.locator('#sampleHeading')).toHaveText('This is a sample page');
            await newTab.close();
        });

        test('TC06 - Handle New Window', async ({ page }) => {
            const newWindowPromise = page.waitForEvent('popup');
            await alertFrameWindow.clickWindowButton();
            const newWindow = await newWindowPromise;
            await newWindow.waitForLoadState();

            await expect(newWindow.locator('#sampleHeading')).toHaveText('This is a sample page');
            await newWindow.close();
        });
    });

    test.describe('Frames (iFrame Handling)', () => {
        test.beforeEach(async () => {
            await alertFrameWindow.navigateToFrames();
        });

        test('TC07 - Read text inside iframe', async () => {
            // Frame 1
            const frame1Heading = alertFrameWindow.frame1.locator('#sampleHeading');
            await expect(frame1Heading).toBeVisible();
            await expect(frame1Heading).toHaveText('This is a sample page');

            // Frame 2
            const frame2Heading = alertFrameWindow.frame2.locator('#sampleHeading');
            await expect(frame2Heading).toBeVisible();
            await expect(frame2Heading).toHaveText('This is a sample page');
        });
    });

    test.describe('Modal Dialogs', () => {
        test.beforeEach(async () => {
            await alertFrameWindow.navigateToModalDialogs();
        });

        test('TC08 - Handle Small Modal', async () => {
            await alertFrameWindow.openSmallModal();
            await expect(alertFrameWindow.modalContent).toBeVisible();
            await expect(alertFrameWindow.modalTitle).toHaveText('Small Modal');
            await expect(alertFrameWindow.modalBody).toContainText('This is a small modal');

            await alertFrameWindow.closeSmallModal();
            await expect(alertFrameWindow.modalContent).not.toBeVisible();
        });

        test('TC09 - Handle Large Modal', async () => {
            await alertFrameWindow.openLargeModal();
            await expect(alertFrameWindow.modalContent).toBeVisible();
            await expect(alertFrameWindow.modalTitle).toHaveText('Large Modal');
            await expect(alertFrameWindow.modalBody).toContainText('Lorem Ipsum is simply dummy text');

            await alertFrameWindow.closeLargeModal();
            await expect(alertFrameWindow.modalContent).not.toBeVisible();
        });
    });
});
