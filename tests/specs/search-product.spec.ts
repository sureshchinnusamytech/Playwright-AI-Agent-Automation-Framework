// spec: specs/automation-exercise-test-plan.md
// seed: tests/seed.spec.ts

import { test } from "@playwright/test";
import { ProductSearchPage } from "../pages/ProductSearchPage";

test.describe("Product Browsing & Search", () => {
  test("Search Product", async ({ page }) => {
    const searchPage = new ProductSearchPage(page);
    const searchTerm = "Dress";

    // 1. Navigate to https://automationexercise.com/products
    await searchPage.navigateToProducts();

    // 2, 3, 4. Search for product
    await searchPage.searchProduct(searchTerm);

    // 5. Verify search results page loads
    await searchPage.verifySearchResultsPageLoaded();

    // 6. Verify only products matching search term are displayed
    await searchPage.verifyProductNamesContainSearchTerm(searchTerm);

    // 7. Verify each result contains:
    //    - Product name
    await searchPage.verifyProductNamesContainSearchTerm(searchTerm);

    //    - Product price
    await searchPage.verifyProductPricesDisplayed();

    //    - Product image
    await searchPage.verifyProductImagesDisplayed();

    // 8. Verify no unrelated products are shown
    await searchPage.verifyNoUnrelatedProductsShown(searchTerm);

    // 9. Verify search results are not empty
    await searchPage.verifySearchResultsNotEmpty();
  });
});
