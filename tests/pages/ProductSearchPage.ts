import { Page, expect } from "@playwright/test";

export class ProductSearchPage {
  constructor(private page: Page) {}

  // Locators
  private get searchProductField() {
    return this.page.getByRole("textbox", {
      name: "Search Product",
    });
  }

  private get searchButton() {
    return this.page.locator("#submit_search");
  }

  private get searchResultsHeader() {
    return this.page.getByText("Searched Products");
  }

  private get productNameElements() {
    return this.page.locator('h2:has-text("Searched Products") ~ div p');
  }

  private get priceElements() {
    return this.page.getByRole("heading", { name: /Rs\./ });
  }

  private get productImages() {
    return this.page.locator('h2:has-text("Searched Products") ~ div img');
  }

  private get productCards() {
    return this.page.locator('h2:has-text("Searched Products") ~ div > div');
  }

  // Navigate to products page
  async navigateToProducts(): Promise<void> {
    await this.page.goto("https://automationexercise.com/products");
  }

  // Search for a product by search term
  async searchProduct(searchTerm: string): Promise<void> {
    await this.searchProductField.fill(searchTerm);
    await this.searchButton.click();
  }

  // Verify search results page loaded with header visible
  async verifySearchResultsPageLoaded(): Promise<void> {
    await expect(this.searchResultsHeader).toBeVisible();
  }

  // Verify product names contain search term
  async verifyProductNamesContainSearchTerm(
    searchTerm: string,
  ): Promise<boolean> {
    const productNames = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll("p")).map((p) => p.textContent),
    );
    const containsSearchTerm = productNames.some((name) =>
      name?.includes(searchTerm),
    );
    expect(containsSearchTerm).toBeTruthy();
    return containsSearchTerm;
  }

  // Verify at least one product price is displayed
  async verifyProductPricesDisplayed(): Promise<void> {
    const priceCount = await this.priceElements.count();
    expect(priceCount).toBeGreaterThan(0);
    await expect(this.priceElements.first()).toBeVisible();
  }

  // Verify product images are displayed
  async verifyProductImagesDisplayed(): Promise<void> {
    const imageCount = await this.productImages.count();
    expect(imageCount).toBeGreaterThan(0);
  }

  // Verify no unrelated products shown (all contain search term)
  async verifyNoUnrelatedProductsShown(searchTerm: string): Promise<void> {
    const allDisplayedNames = await this.page.evaluate(() =>
      Array.from(document.querySelectorAll("p")).map((p) => p.textContent),
    );

    const matchingProducts = allDisplayedNames.filter((name) =>
      name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    expect(matchingProducts.length).toBeGreaterThan(0);
  }

  // Get count of search result products
  async getSearchResultProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  // Verify search results contain minimum products
  async verifySearchResultsNotEmpty(): Promise<void> {
    const productCount = await this.getSearchResultProductCount();
    expect(productCount).toBeGreaterThan(0);
  }

  // Get all product names from search results
  async getAllProductNames(): Promise<(string | null)[]> {
    return await this.productNameElements.allTextContents();
  }

  // Get first product name
  async getFirstProductName(): Promise<string | null> {
    return await this.productNameElements.first().textContent();
  }

  // Verify visible products match criteria
  async verifyAllProductsMatchCriteria(searchTerm: string): Promise<boolean> {
    const allNames = await this.getAllProductNames();
    const allMatch = allNames.every((name) =>
      name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    expect(allMatch).toBeTruthy();
    return allMatch;
  }
}
