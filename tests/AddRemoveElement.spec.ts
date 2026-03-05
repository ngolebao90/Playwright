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
});