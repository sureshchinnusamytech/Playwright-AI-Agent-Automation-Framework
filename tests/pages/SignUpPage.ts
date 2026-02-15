import { Page, expect } from "@playwright/test";

export class SignupPage {
  constructor(private page: Page) {}

  async verifyEnterAccountInfoVisible() {
    await expect(
      this.page.getByText("Enter Account Information"),
    ).toBeVisible();
  }

  async fillAccountDetails(
    title: string,
    password: string,
    day: string,
    month: string,
    year: string,
  ) {
    await this.page.getByRole("radio", { name: title }).click();
    await this.page.getByRole("textbox", { name: "Password *" }).fill(password);
    await this.page.locator("#days").selectOption([day]);
    await this.page.locator("#months").selectOption([month]);
    await this.page.locator("#years").selectOption([year]);
  }

  async selectNewsletterCheckbox() {
    await this.page
      .getByRole("checkbox", { name: "Sign up for our newsletter!" })
      .click();
  }

  async selectOffersCheckbox() {
    await this.page
      .getByRole("checkbox", { name: "Receive special offers from" })
      .click();
  }

  async fillPersonalDetails(
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    address2: string,
    state: string,
    city: string,
    zipcode: string,
    mobile: string,
  ) {
    await this.page
      .getByRole("textbox", { name: "First name *" })
      .fill(firstName);
    await this.page
      .getByRole("textbox", { name: "Last name *" })
      .fill(lastName);
    await this.page
      .getByRole("textbox", { name: "Company", exact: true })
      .fill(company);
    await this.page
      .getByRole("textbox", { name: "Address * (Street address, P." })
      .fill(address);
    await this.page.getByRole("textbox", { name: "Address 2" }).fill(address2);
    await this.page.getByRole("textbox", { name: "State *" }).fill(state);
    await this.page
      .getByRole("textbox", { name: "City * Zipcode *" })
      .fill(city);
    await this.page.locator("#zipcode").fill(zipcode);
    await this.page
      .getByRole("textbox", { name: "Mobile Number *" })
      .fill(mobile);
  }

  async clickCreateAccount() {
    await this.page.getByRole("button", { name: "Create Account" }).click();
  }
}
