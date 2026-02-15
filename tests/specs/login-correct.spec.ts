// spec: specs/automation-exercise-test-plan.md
//Validate login functionality user case

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { AccountPage } from "../pages/AccountPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignUpPage";

test.describe("User Registration", () => {
  test("Register a new user successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
    const home = new HomePage(page);
    const account = new AccountPage(page);
    const userName = homePage.generateUsername();
    

    // Given I launch the browser
    // When I navigate to url 'http://automationexercise.com'
    await homePage.navigate();

    // And I verify that home page is visible successfully
    await homePage.verifyHomePageVisible();

    // And I click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // And I verify 'New User Signup!' is visible
    await loginPage.verifyNewUserSignupVisible();

    // And I enter name "Test User" and email address "sureshgtech91@testmail.com"
    await loginPage.enterNameAndEmail(
      "Test User",
       userName,
    );

    // And I click 'Signup' button

    await loginPage.clickSignup();

    // And I verify that 'ENTER ACCOUNT INFORMATION' is visible
    await signupPage.verifyEnterAccountInfoVisible();

    // And I fill details: Title "Mr.", Name "Test User", Email "surechtech86@testmail.com", Password "password123", Date of birth "1", "January", "1990"
    await signupPage.fillAccountDetails(
      "Mr.",
      "password",
      "1",
      "January",
      "1990",
    );

    // And I select checkbox 'Sign up for our newsletter!'
    await signupPage.selectNewsletterCheckbox();

    // And I select checkbox 'Receive special offers from our partners!'
    await signupPage.selectOffersCheckbox();

    // And I fill details: First name "Test", Last name "User", Company "Test Company", Address "123 Test St", Address2 "Apt 1", Country "United States", State "Test State", City "Test City", Zipcode "12345", Mobile Number "1234567890"
    await signupPage.fillPersonalDetails(
      "Test",
      "User",
      "Test Company",
      "123 Test St",
      "Apt 1",
      "Test State",
      "Test City",
      "12345",
      "1234567890",
    );

    // And I click 'Create Account' button
    await signupPage.clickCreateAccount();

    // Then I verify that 'ACCOUNT CREATED!' is visible
    await accountPage.verifyAccountCreatedVisible();

    // When I click 'Continue' button
    await accountPage.clickContinue();

    // When I click logout button
    await homePage.logOut();

    // Launch browser and navigate to url
    // await home.navigate();

    // Verify that home page is visible successfully
    // await home.verifyHomePageVisible();

    // Click on 'Signup / Login' button
    await home.clickSignupLogin();

    // Verify 'Login to your account' section is visible
    await expect(
      page.getByRole("heading", { name: "Login to your account" }),
    ).toBeVisible();

    // Enter correct email and password
    // NOTE: replace these with valid test credentials or use environment variables
    const email = process.env.TEST_USER_EMAIL || userName;
    const password = process.env.TEST_USER_PASSWORD || "password";

    await page.locator('[data-qa="login-email"]').fill(email);
    await page.locator('[data-qa="login-password"]').fill(password);

    // Click 'Login' button
    await page.getByRole("button", { name: "Login" }).click();

    // Verify that user is logged in (Logged in as username)
    const username = process.env.TEST_USER_NAME || "Test User";
    await account.verifyLoggedInAs(username);

    // Delete user accout
    await accountPage.clickDeleteAccount();
  });
});
