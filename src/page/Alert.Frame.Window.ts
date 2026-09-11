import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class AlertFrameWindow {
    readonly page: Page;

    // Navigation Submenu
    readonly linkAlertFrameWindow: Locator;
    readonly menuBrowserWindows: Locator;
    readonly menuAlerts: Locator;
    readonly menuFrames: Locator;
    readonly menuNestedFrames: Locator;
    readonly menuModalDialogs: Locator;

    // Alerts
    readonly alertButton: Locator;
    readonly timerAlertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;
    readonly alertResult: Locator;
    readonly confirmResult: Locator;
    readonly promptResult: Locator;

    // Browser Windows
    readonly tabButton: Locator;
    readonly windowButton: Locator;
    readonly messageWindowButton: Locator;

    // Frames
    readonly frame1: FrameLocator;
    readonly frame2: FrameLocator;

    // Modal Dialogs
    readonly smallModalButton: Locator;
    readonly largeModalButton: Locator;
    readonly smallModalCloseButton: Locator;
    readonly largeModalCloseButton: Locator;
    readonly modalContent: Locator;
    readonly modalTitle: Locator;
    readonly modalBody: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation
        this.linkAlertFrameWindow = page.getByText('Alerts, Frame & Windows', { exact: true });
        this.menuBrowserWindows = page.getByRole('listitem').filter({ hasText: /^Browser Windows$/ });
        this.menuAlerts = page.getByRole('listitem').filter({ hasText: /^Alerts$/ });
        this.menuFrames = page.getByRole('listitem').filter({ hasText: /^Frames$/ });
        this.menuNestedFrames = page.getByRole('listitem').filter({ hasText: /^Nested Frames$/ });
        this.menuModalDialogs = page.getByRole('listitem').filter({ hasText: /^Modal Dialogs$/ });

        // Alerts
        this.alertButton = page.locator('#alertButton');
        this.timerAlertButton = page.locator('#timerAlertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.promptButton = page.locator('#promtButton');
        this.alertResult = page.locator('#alertResult');
        this.confirmResult = page.locator('#confirmResult');
        this.promptResult = page.locator('#promptResult');

        // Browser Windows
        this.tabButton = page.locator('#tabButton');
        this.windowButton = page.locator('#windowButton');
        this.messageWindowButton = page.locator('#messageWindowButton');

        // Frames
        this.frame1 = page.frameLocator('#frame1');
        this.frame2 = page.frameLocator('#frame2');

        // Modal Dialogs
        this.smallModalButton = page.locator('#showSmallModal');
        this.largeModalButton = page.locator('#showLargeModal');
        this.smallModalCloseButton = page.locator('#closeSmallModal');
        this.largeModalCloseButton = page.locator('#closeLargeModal');
        this.modalContent = page.locator('.modal-content');
        this.modalTitle = page.locator('.modal-title');
        this.modalBody = page.locator('.modal-body');
    }

    // Navigation methods
    async clickLinkAlertFrameWindow() {
        await this.linkAlertFrameWindow.click();
    }

    async navigateToAlerts() {
        await this.menuAlerts.click();
    }

    async navigateToBrowserWindows() {
        await this.menuBrowserWindows.click();
    }

    async navigateToFrames() {
        await this.menuFrames.click();
    }

    async navigateToModalDialogs() {
        await this.menuModalDialogs.click();
    }

    // Alert methods
    async clickAlertButton() {
        await this.alertButton.click();
    }

    async clickTimerAlertButton() {
        await this.timerAlertButton.click();
    }

    async clickConfirmButton() {
        await this.confirmButton.click();
    }

    async clickPromptButton() {
        await this.promptButton.click();
    }

    async getAlertResultText() {
        return await this.alertResult.textContent();
    }

    async getConfirmResultText() {
        return await this.confirmResult.textContent();
    }

    async getPromptResultText() {
        return await this.promptResult.textContent();
    }

    // Browser Windows methods
    async clickTabButton() {
        await this.tabButton.click();
    }

    async clickWindowButton() {
        await this.windowButton.click();
    }

    // Modal Dialog methods
    async openSmallModal() {
        await this.smallModalButton.click();
    }

    async closeSmallModal() {
        await this.smallModalCloseButton.click();
    }

    async openLargeModal() {
        await this.largeModalButton.click();
    }

    async closeLargeModal() {
        await this.largeModalCloseButton.click();
    }
}