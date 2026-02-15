import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async verifyNewUserSignupVisible() {
    await expect(
      this.page.getByRole("heading", { name: "New User Signup!" }),
    ).toBeVisible();
  }

  async enterNameAndEmail(name: string, email: string) {
    await this.page.getByRole("textbox", { name: "Name" }).fill(name);
    await this.page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address")
      .fill(email);
  }

  async clickSignup() {
    await this.page.getByRole("button", { name: "Signup" }).click();
  }
}
