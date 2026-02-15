// spec: specs/automation-exercise-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";

test.describe("Shopping Cart & Subscription", () => {
  test("Add Products in Cart", async ({ page }) => {
    const cartPage = new CartPage(page);

    // Test Data
    const expectedFirstProductName = "Blue Top";
    const expectedPricePrefix = "Rs.";

    // 1. Navigate to https://automationexercise.com/
    await cartPage.navigateToHome();

    // 2. Method A - From Home Page:
    //    - Click "Add to cart" button on any featured product
    await cartPage.addProductToCartFromHome();

    //    - Verify product is added
    await cartPage.viewCartAfterAdding();

    // 5. Navigate to Cart page by clicking "Cart" link (already done via viewCartAfterAdding)
    await cartPage.verifyCartPageLoaded();

    // 6. Verify cart displays all added products
    await cartPage.verifyCartNotEmpty();

    // 7. Verify each product shows:
    //    - Product name
    const productNames = await cartPage.verifyProductNamesInCart();
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames[0]).toContain(expectedFirstProductName);

    //    - Product price
    const productPrices = await cartPage.verifyProductPricesInCart();
    expect(productPrices.length).toBeGreaterThan(0);
    expect(productPrices[0]?.includes(expectedPricePrefix)).toBeTruthy();

    //    - Total (price × quantity)
    const totals = await cartPage.getProductTotalsInCart();
    expect(totals.length).toBeGreaterThan(0);
    expect(totals[0]?.includes(expectedPricePrefix)).toBeTruthy();

    // Additional verification: Check if product exists in cart
    const productExists = await cartPage.verifyProductInCart(
      expectedFirstProductName,
    );
    expect(productExists).toBeTruthy();
  });
});
