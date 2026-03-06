import { spec } from "node:test/reporters"; 
import { test, expect } from '@playwright/test';
import { AddRemoveElementPage } from '../page/Add Remove element';

test.describe('The Internet - Add/Remove Element POM Tests (TypeScript)', () => {
    let addRemoveElementPage: AddRemoveElementPage;

    test.beforeEach(async ({ page }) => {
        addRemoveElementPage = new AddRemoveElementPage(page);
        await addRemoveElementPage.goto();
    });

    test('TC01 - Verify Adding Elements', async () => {
        await addRemoveElementPage.clickAddButton(3); 
        const count = await addRemoveElementPage.getDeleteButtonsCount();
        console.log(`Total delete buttons after adding: ${count}`);
        
        expect(count).toBe(3);
    });

    test('TC02 - Verify Removing Elements', async () => {
        await addRemoveElementPage.clickAddButton(5); 
        await addRemoveElementPage.clickDeleteButton(0); 
        await addRemoveElementPage.clickDeleteButton(0); 
        const count = await addRemoveElementPage.getDeleteButtonsCount();
        console.log(`Total delete buttons after removing: ${count}`);
        
        expect(count).toBe(3);
    });

    test('TC03 - Verify Removing All Elements', async () => {
        await addRemoveElementPage.clickAddButton(2); 
        const initialCount = await addRemoveElementPage.getDeleteButtonsCount();
        console.log(`Initial delete buttons count: ${initialCount}`);
        
        for (let i = 0; i < initialCount; i++) {
            await addRemoveElementPage.clickDeleteButton(0); 
        }
        
        const finalCount = await addRemoveElementPage.getDeleteButtonsCount();
        console.log(`Final delete buttons count after removing all: ${finalCount}`);
        
        expect(finalCount).toBe(0);
    });

    test('TC04 - Verify Add Button Visible and Enabled', async ({ page }) => {
        const visible = await addRemoveElementPage.isAddButtonVisible();
        const enabled = await addRemoveElementPage.isAddButtonEnabled();

        expect(visible).toBeTruthy();
        expect(enabled).toBeTruthy();
    });

    test('TC05 - Verify Delete Button Text', async () => {
        await addRemoveElementPage.clickAddButton(1);
        const text = await addRemoveElementPage.getDeleteButtonText(0);

        expect(text).toBe('Delete');
    });

    test('TC06 - Verify Deleting With No Elements Throws', async () => {
        await expect(addRemoveElementPage.clickDeleteButton(0)).rejects.toThrow();
    });

    test('TC07 - Verify Deleting Specific Index Reduces Count', async () => {
        await addRemoveElementPage.clickAddButton(4);
        const before = await addRemoveElementPage.getDeleteButtonsCount();
        await addRemoveElementPage.clickDeleteButton(2);
        const after = await addRemoveElementPage.getDeleteButtonsCount();

        expect(before).toBe(4);
        expect(after).toBe(3);
    });
});