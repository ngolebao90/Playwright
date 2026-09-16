import { Page, Locator, expect } from '@playwright/test';

export class Interactions {
    readonly page: Page;

    // Navigation
    readonly linkInteractions: Locator;
    readonly menuSortable: Locator;
    readonly menuSelectable: Locator;

    // Sortable Locators
    readonly sortableTabList: Locator;
    readonly sortableTabGrid: Locator;
    readonly sortableListItems: Locator;
    readonly sortableGridItems: Locator;

    // Selectable Locators
    readonly selectableTabList: Locator;
    readonly selectableTabGrid: Locator;
    readonly selectableListItems: Locator;
    readonly selectableGridItems: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation
        this.linkInteractions = page.getByText('Interactions', { exact: true });
        this.menuSortable = page.getByRole('listitem').filter({ hasText: /^Sortable$/ });
        this.menuSelectable = page.getByRole('listitem').filter({ hasText: /^Selectable$/ });

        // Sortable
        this.sortableTabList = page.locator('#demo-tab-list');
        this.sortableTabGrid = page.locator('#demo-tab-grid');
        this.sortableListItems = page.locator('#demo-tabpane-list .list-group-item');
        this.sortableGridItems = page.locator('#demo-tabpane-grid .list-group-item');

        // Selectable
        this.selectableTabList = page.locator('#demo-tab-list');
        this.selectableTabGrid = page.locator('#demo-tab-grid');
        this.selectableListItems = page.locator('#demo-tabpane-list .list-group-item');
        this.selectableGridItems = page.locator('#demo-tabpane-grid .list-group-item');
    }

    // Navigation Methods
    async clickLinkInteractions() {
        await this.linkInteractions.click();
    }

    async navigateToSortable() {
        await this.menuSortable.click();
        await expect(this.page).toHaveURL(/.*sortable/);
    }

    async navigateToSelectable() {
        await this.menuSelectable.click();
        await expect(this.page).toHaveURL(/.*selectable/);
    }

    // Sortable Actions
    async switchSortableToGridTab() {
        await this.sortableTabGrid.click();
        await expect(this.sortableGridItems.first()).toBeVisible();
    }

    async switchSortableToListTab() {
        await this.sortableTabList.click();
        await expect(this.sortableListItems.first()).toBeVisible();
    }

    async dragAndDropListItem(sourceIndex: number, targetIndex: number) {
        const source = this.sortableListItems.nth(sourceIndex);
        const target = this.sortableListItems.nth(targetIndex);
        await source.dragTo(target);
    }

    async dragAndDropGridItem(sourceIndex: number, targetIndex: number) {
        const source = this.sortableGridItems.nth(sourceIndex);
        const target = this.sortableGridItems.nth(targetIndex);
        await source.dragTo(target);
    }

    async getSortableListTexts(): Promise<string[]> {
        return await this.sortableListItems.allTextContents();
    }

    async getSortableGridTexts(): Promise<string[]> {
        return await this.sortableGridItems.allTextContents();
    }

    // Selectable Actions
    async switchSelectableToGridTab() {
        await this.selectableTabGrid.click();
        await expect(this.selectableGridItems.first()).toBeVisible();
    }

    async switchSelectableToListTab() {
        await this.selectableTabList.click();
        await expect(this.selectableListItems.first()).toBeVisible();
    }

    async selectListItem(indexOrText: number | string) {
        if (typeof indexOrText === 'number') {
            await this.selectableListItems.nth(indexOrText).click();
        } else {
            await this.selectableListItems.filter({ hasText: indexOrText }).first().click();
        }
    }

    async selectGridItem(indexOrText: number | string) {
        if (typeof indexOrText === 'number') {
            await this.selectableGridItems.nth(indexOrText).click();
        } else {
            await this.selectableGridItems.filter({ hasText: indexOrText }).first().click();
        }
    }
}

