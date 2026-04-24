import { expect, Locator, Page } from '@playwright/test';

// Page Object Model for the Practice Software Testing homepage.
// This class keeps selectors and interactions together in one place.
export class Homepage {
  readonly page: Page;
  readonly demoNotice: Locator;
  readonly sortLabel: Locator;
  readonly priceRangeLabel: Locator;
  readonly categorySection: Locator;
  readonly brandSection: Locator;
  readonly sustainabilitySection: Locator;
  readonly productList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly privacyPolicyLink: Locator;
  readonly documentationLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // The main visible elements on the homepage.
    // Using explicit text and role-based locators for maximum resilience.
    this.demoNotice = page.getByText('This is a DEMO application');
    this.sortLabel = page.getByText('Sort');
    this.priceRangeLabel = page.getByText('Price Range');
    this.categorySection = page.getByText('By category');
    this.brandSection = page.getByText('By brand');
    this.sustainabilitySection = page.getByText('Sustainability');

    // Product cards are identified by the common ".card" class.
    this.productList = page.locator('.card');

    // Search components: Input field and the explicit Search button.
    this.searchInput = page.getByPlaceholder(/search/i);
    this.searchButton = page.locator('[data-test="search-submit"]');

    // Footer links located at the bottom of the page.
    this.privacyPolicyLink = page.getByRole('link', { name: /privacy policy/i });
    this.documentationLink = page.getByRole('link', { name: /documentation/i });
  }

  // Navigate to the homepage using the base URL.
  async goto() {
    await this.page.goto('/');
  }

  // Basic homepage load verification.
  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.demoNotice).toBeVisible({ timeout: 15000 });
  }

  // Check that the main homepage sections and product grid are visible.
  async expectHomepageSections() {
    await expect(this.sortLabel).toBeVisible();
    await expect(this.priceRangeLabel).toBeVisible();
    await expect(this.categorySection).toBeVisible();
    await expect(this.brandSection).toBeVisible();
    
    // Explicitly wait for the first product card to appear.
    // This is more reliable than 'networkidle' for dynamic SPA content.
    await this.productList.first().waitFor({ state: 'visible', timeout: 15000 });
    
    await expect(this.sustainabilitySection).toBeVisible();
    await expect(this.productList.first()).toBeVisible();
  }

  // Perform a search and wait for the results to be filtered or URL to update.
  async search(query: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(query)
    
    // Trigger the search.
    await this.searchButton.click();
    
    // FIX: Using 'domcontentloaded' instead of the default 'load' state.
    // In SPAs, the 'load' event often doesn't re-fire on search.
    await this.productList.first().waitFor({ 
    state: 'visible', 
    timeout: 15000 
  });

    // Ensure the results are actually rendered before proceeding.
    //await this.productList.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  // Click a specific product card based on its visible title text.
  async clickProductByName(productName: string) {
    const product = this.page.locator('.card-title').filter({ hasText: productName }).first();
    await product.scrollIntoViewIfNeeded();
    await expect(product).toBeVisible({ timeout: 10000 });
    await product.click();
  }

  // Navigate to the Privacy Policy page.
  async openPrivacyPolicy() {
    await expect(this.privacyPolicyLink).toBeVisible();
    await this.privacyPolicyLink.click();
  }

  // Click the Documentation link. 
  async openDocumentation() {
    await expect(this.documentationLink).toBeVisible();
    await this.documentationLink.click();
  }
}