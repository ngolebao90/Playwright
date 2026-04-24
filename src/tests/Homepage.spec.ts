import { expect, test } from '@playwright/test';
import { Homepage } from '../page/Homepage';

test.describe('Practice Software Testing homepage', () => {
  
 // TC001 - High Priority: Verify core homepage elements and sections.
  test('TC001 - should load, scroll, and display all homepage sections @priority-high', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.goto();
    await homepage.expectLoaded();
    
    // Verify top & middle sections
    await homepage.expectHomepageSections();

    // ACTION: Scroll to the bottom of the page to ensure visibility of footer elements.
    // This is useful for testing long pages or elements that load on scroll.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Verify footer elements are visible after scrolling
    await expect(homepage.privacyPolicyLink).toBeVisible();
    await expect(homepage.documentationLink).toBeVisible();
    
    // Optional: Scroll back to top if needed for further actions
    await page.evaluate(() => window.scrollTo(0, 0));
  });

  // TC002 - High Priority: Verify that the search functionality triggers navigation.
  test('TC002 - should perform search and display filtered results @priority-high', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.goto();
    await homepage.expectLoaded();
    
    // Perform search
    await homepage.search('pliers');

    // check that the results header confirms the search query.
    await expect(page.getByRole('heading', { name: /searched for: pliers/i })).toBeVisible();

    // Verify at least one product card is visible in the results
    await expect(homepage.productList.first()).toBeVisible();
  });

  // TC003 - High Priority: Verify navigation to a specific product detail page.
  test('TC003 - should click on a product and navigate to product page @priority-high', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.goto();
    // Ensure the page is ready before looking for products.
    await homepage.expectLoaded();

    // Verify the product is visible with a sufficient timeout for slow API responses.
    // We use the page object method to perform the interaction.
    await homepage.clickProductByName('Combination Pliers');
    
    // Check if the URL changed to the product detail path.
    await expect(page).toHaveURL(/product/i);
  });

  // TC004 - Medium Priority: Verify internal footer link navigation.
  test('TC004 - should open Privacy Policy page @priority-medium', async ({ page }) => {
    const homepage = new Homepage(page);

    await homepage.goto();
    await homepage.expectLoaded();
    await homepage.openPrivacyPolicy();

    // Verify successful navigation to the Privacy Policy section.
    await expect(page).toHaveURL(/privacy/i);
  });

  // TC005 - Low Priority: Verify external link opens in a new tab.
  test('TC005 - should open Documentation page @priority-low', async ({ page, context }) => {
    const homepage = new Homepage(page);
    
    await homepage.goto();
    await homepage.expectLoaded();

    // Capture the new tab/window event before performing the click action.
    // This is required for links that use target="_blank".
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),   // Wait for the new page event to fire.
        homepage.openDocumentation()    // Perform the trigger action.
    ]);

    // Ensure the new tab is fully loaded before asserting the URL.
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/testsmith-io\.github\.io/i);
    
    // Clean up by closing the secondary tab.
    await newPage.close();
  });
});