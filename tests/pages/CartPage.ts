import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  private get cartLink() {
    return this.page.getByRole("link", { name: " Cart" });
  }

  private get viewCartLink() {
    return this.page.getByRole("link", { name: "View Cart" });
  }

  private get cartTable() {
    return this.page.locator("table");
  }

  private get productNames() {
    return this.page.locator("table tbody tr td h4 a");
  }

  private get productPrices() {
    return this.page.locator("table tbody tr td:nth-child(3) p");
  }

  private get productQuantities() {
    return this.page.locator("table tbody tr td:nth-child(4) button");
  }

  private get productTotals() {
    return this.page.locator("table tbody tr td:nth-child(5) p");
  }

  private get continueShoppingButton() {
    return this.page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  private get proceedToCheckoutButton() {
    return this.page.locator("text=Proceed To Checkout").first();
  }

  private get addToCartButtons() {
    return this.page.locator("a[data-product-id]").filter({
      hasText: "Add to cart",
    });
  }

  private get cartEmptyMessage() {
    return this.page.locator("text=Cart is Empty! Click here to buy products.");
  }

  private get removeButtons() {
    return this.page.locator("a[data-product-id]").filter({
      hasText: "Remove from cart",
    });
  }

  private get homeLink() {
    return this.page.getByRole("link", { name: "Home" });
  }

  private get productsLink() {
    return this.page.locator("a").filter({ hasText: "Products" }).first();
  }

  private get productModal() {
    return this.page.locator(".modal-dialog");
  }

  private get addToCartInsideModal() {
    return this.page.locator(".modal .btn-default:has-text('Add to cart')");
  }

  // Navigation Methods
  async navigateToHome(): Promise<void> {
    await this.page.goto("https://automationexercise.com/", {
      waitUntil: "domcontentloaded",
    });
    await this.page.waitForTimeout(500);
  }

  async navigateToProducts(): Promise<void> {
    const productsLink = this.page.locator("a").filter({ hasText: "Products" });
    await productsLink.first().click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(500);
  }

  async navigateToCart(): Promise<void> {
    const cartLink = this.page.locator("a").filter({ hasText: "Cart" });
    await cartLink.first().click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(500);
  }

  // Add to Cart Methods
  async addProductToCartFromHome(): Promise<void> {
    // Scroll to featured products section
    await this.page.locator("text=Features Items").scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);

    // Click on first "Add to cart" button
    const firstAddToCartButton = this.page
      .locator("a[data-product-id]")
      .filter({ hasText: "Add to cart" })
      .first();
    await firstAddToCartButton.click();

    // Wait for success message
    await this.page.waitForTimeout(1000);
  }

  async addProductToCartFromProducts(productIndex: number = 0): Promise<void> {
    // Get all add to cart buttons from products page
    const addToCartButtons = this.page
      .locator("a[data-product-id]")
      .filter({ hasText: "Add to cart" });
    const buttonCount = await addToCartButtons.count();

    if (buttonCount > productIndex) {
      await addToCartButtons.nth(productIndex).click();
      await this.page.waitForTimeout(1000);
    } else {
      throw new Error(`Product index ${productIndex} not found`);
    }
  }

  async addProductToCartFromDetails(productIndex: number = 0): Promise<void> {
    // Navigate to products page
    await this.navigateToProducts();

    // Click on a product to open details
    const productLinks = this.page.locator("a[href*='/product/']").first();
    await productLinks.click();
    await this.page.waitForLoadState("domcontentloaded");

    // Click add to cart button on details page
    const detailsAddToCartButton = this.page
      .locator("button:has-text('Add to cart')")
      .first();
    await detailsAddToCartButton.click();
    await this.page.waitForTimeout(1000);
  }

  // Cart Page Verification Methods
  async verifyCartPageLoaded(): Promise<void> {
    // Verify cart page by checking for cart table which is unique to cart page
    await expect(this.cartTable).toBeVisible();
  }

  async verifyCartNotEmpty(): Promise<void> {
    const rows = this.page.locator("table tbody tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async verifyCartEmpty(): Promise<void> {
    await expect(this.cartEmptyMessage).toBeVisible();
  }

  // Product Count and Details Methods
  async getCartProductCount(): Promise<number> {
    const rows = this.page.locator("table tbody tr");
    return await rows.count();
  }

  // Product Information Retrieval
  async verifyProductNamesInCart(): Promise<(string | null)[]> {
    const names: (string | null)[] = [];
    const rows = this.page.locator("table tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const nameElement = rows.nth(i).locator("h4 a");
      const name = await nameElement.textContent();
      names.push(name?.trim() || null);
    }

    return names;
  }

  async verifyProductPricesInCart(): Promise<(string | null)[]> {
    const prices: (string | null)[] = [];
    const rows = this.page.locator("table tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const priceElement = rows.nth(i).locator("td:nth-child(3) p");
      const price = await priceElement.textContent();
      prices.push(price?.trim() || null);
    }

    return prices;
  }

  async getProductQuantitiesInCart(): Promise<(string | null)[]> {
    const quantities: (string | null)[] = [];
    const rows = this.page.locator("table tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const quantityElement = rows.nth(i).locator("td:nth-child(4) button");
      const quantity = await quantityElement.getAttribute("value");
      quantities.push(quantity || null);
    }

    return quantities;
  }

  async getProductTotalsInCart(): Promise<(string | null)[]> {
    const totals: (string | null)[] = [];
    const rows = this.page.locator("table tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const totalElement = rows.nth(i).locator("td:nth-child(5) p");
      const total = await totalElement.textContent();
      totals.push(total?.trim() || null);
    }

    return totals;
  }

  async getProductAtIndex(
    index: number,
  ): Promise<{ name: string; price: string; quantity: string; total: string }> {
    const rows = this.page.locator("table tbody tr");
    const row = rows.nth(index);

    const name = await row.locator("h4 a").textContent();
    const price = await row.locator("td:nth-child(3) p").textContent();
    const quantity = await row
      .locator("td:nth-child(4) button")
      .getAttribute("value");
    const total = await row.locator("td:nth-child(5) p").textContent();

    return {
      name: name?.trim() || "",
      price: price?.trim() || "",
      quantity: quantity?.trim() || "",
      total: total?.trim() || "",
    };
  }

  async verifyFirstProductDetails(): Promise<{
    name: string;
    price: string;
    quantity: string;
    total: string;
  }> {
    return await this.getProductAtIndex(0);
  }

  async verifyProductInCart(productName: string): Promise<boolean> {
    const productLink = this.page.locator(`h4 a:has-text('${productName}')`);
    return await productLink.isVisible();
  }

  async verifyAllProductsInCart(): Promise<boolean> {
    const rows = this.page.locator("table tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const name = await row.locator("h4 a").textContent();
      const price = await row.locator("td:nth-child(3) p").textContent();
      const quantity = await row
        .locator("td:nth-child(4) button")
        .getAttribute("value");
      const total = await row.locator("td:nth-child(5) p").textContent();

      if (!name || !price || !quantity || !total) {
        return false;
      }
    }

    return true;
  }

  async verifyPriceFormat(price: string): Promise<boolean> {
    const pricePattern = /Rs\./;
    return pricePattern.test(price);
  }

  // Cart Actions
  async continueShoppingAfterAdd(): Promise<void> {
    // Look for continue shopping button in modal or page
    const continueButton = this.page.locator(
      ".btn:has-text('Continue Shopping'), button:has-text('Continue Shopping')",
    );
    if (await continueButton.isVisible()) {
      await continueButton.first().click();
      await this.page.waitForTimeout(500);
    }
  }

  async viewCartAfterAdding(): Promise<void> {
    // Click on "View Cart" button after product added
    const viewCartButton = this.page.locator(
      "a:has-text('View Cart'), .btn:has-text('View Cart')",
    );
    if (await viewCartButton.isVisible()) {
      await viewCartButton.first().click();
      await this.page.waitForLoadState("domcontentloaded");
    } else {
      // Alternative: click cart link in header
      await this.navigateToCart();
    }
  }

  async removeProductFromCart(productIndex: number): Promise<void> {
    const rows = this.page.locator("table tbody tr");
    const row = rows.nth(productIndex);
    const removeLink = row.locator("a[data-product-id]").filter({
      hasText: "Remove from cart",
    });

    if (await removeLink.isVisible()) {
      await removeLink.click();
      await this.page.waitForLoadState("domcontentloaded");
    }
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async getAllCartTotals(): Promise<string[]> {
    const totals: string[] = [];
    const rows = this.page.locator("table tbody tr");
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const total = await rows
        .nth(i)
        .locator("td:nth-child(5) p")
        .textContent();
      if (total) {
        totals.push(total.trim());
      }
    }

    return totals;
  }
}
