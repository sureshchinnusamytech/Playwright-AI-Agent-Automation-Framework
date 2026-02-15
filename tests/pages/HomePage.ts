import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("http://automationexercise.com");
  }

  generateUsername(): string {
    const timestamp = Date.now(); // current time in ms
    return `user_${timestamp}@testmail.com`;
  }

  async verifyHomePageVisible() {
    await expect(
      this.page.getByRole("heading", { name: "AutomationExercise" }),
    ).toBeVisible();
  }

  async clickSignupLogin() {
    await this.page.getByRole("link", { name: " Signup / Login" }).click();
  }

  async logOut() {
    await this.page.getByRole("link", { name: " Logout" }).click();
  }
}
