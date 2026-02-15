import { Page, expect } from "@playwright/test";

export class AccountPage {
  constructor(private page: Page) {}

  async verifyAccountCreatedVisible() {
    await expect(this.page.getByText("Account Created!")).toBeVisible();
  }

  async clickContinue() {
    await this.page.getByRole("link", { name: "Continue" }).click();
  }

  async verifyLoggedInAs(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async clickDeleteAccount() {
    await this.page.getByRole("link", { name: " Delete Account" }).click();
  }

  async verifyAccountDeletedVisible() {
    await expect(this.page.getByText("Account Deleted!")).toBeVisible();
  }
}
