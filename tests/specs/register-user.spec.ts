// spec: specs/plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignUpPage";
import { AccountPage } from "../pages/AccountPage";

test.describe("User Registration", () => {
  test("Register a new user successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountPage = new AccountPage(page);
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

    // And I enter name "Test User" and email address "surechtech86@testmail.com"
    await loginPage.enterNameAndEmail("Test User", userName);

    // And I click 'Signup' button
    await loginPage.clickSignup();

    // And I verify that 'ENTER ACCOUNT INFORMATION' is visible
    await signupPage.verifyEnterAccountInfoVisible();

    // And I fill details: Title "Mr.", Name "Test User", Email "surechtech86@testmail.com", Password "password123", Date of birth "1", "January", "1990"
    await signupPage.fillAccountDetails(
      "Mr.",
      "password123",
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

    // Then I verify that 'Logged in as Test User' is visible
    await accountPage.verifyLoggedInAs("Test User");

    // When I click 'Delete Account' button
    await accountPage.clickDeleteAccount();

    // Then I verify that 'ACCOUNT DELETED!' is visible
    await accountPage.verifyAccountDeletedVisible();

    // And I click 'Continue' button
    await accountPage.clickContinue();
  });
});
