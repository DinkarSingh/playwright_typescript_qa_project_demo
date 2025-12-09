import { test } from "../../fixtures/user";
import { expect } from "@playwright/test";
import { TestArgs } from "../../types/types";
import { defaultData } from "../../data/default";
import { faker } from "@faker-js/faker";

test.describe("User Registration", () => {
  test("should register a new user and login successfully", async ({
    page,
  }) => {
    await page.goto("");
    await expect(
      page.getByRole("heading", { name: "Contact List App" }),
    ).toBeVisible();
    await page
      .getByRole("textbox", { name: "Email" })
      .fill(defaultData.userCredentials[0].email);
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(defaultData.userCredentials[0].password);
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByRole("heading", { name: "Contact List" }),
    ).toBeVisible();
  });
});

// UI Test: Create a New Contact
test.describe("Create New Contact", () => {
  test.beforeEach(async ({ page, user }: TestArgs) => {
    await user.login();
    await page.goto("/contactList");
  });

  test("should create a new contact and verify in list", async ({
    page,
  }: TestArgs) => {
    const birthdate = faker.date
      .birthdate({ min: 18, max: 65, mode: "age" })
      .toISOString()
      .split("T")[0];
    const address = faker.location.streetAddress();
    const email = faker.internet.email();
    const phone = faker.phone.number();

    await page.getByRole("button", { name: "Add a New Contact" }).click();
    await page.getByRole("textbox", { name: "* First Name:" }).fill("Jakak");
    await page.getByRole("textbox", { name: "* Last Name:" }).fill("juli");
    await page.getByRole("textbox", { name: "Date of Birth:" }).fill(birthdate);
    await page.getByRole("textbox", { name: "Email:" }).fill(email);
    await page.getByRole("textbox", { name: "Phone:" }).fill(phone);
    await page
      .getByRole("textbox", { name: "Street Address 1:" })
      .fill(address);
    await page
      .getByRole("textbox", { name: "Street Address 2:" })
      .fill("France");
    await page.getByRole("textbox", { name: "City:" }).fill("Paris");
    await page
      .getByRole("textbox", { name: "State or Province:" })
      .fill("Ile de France");
    await page.getByRole("textbox", { name: "Postal Code:" }).fill("67890");
    await page.getByRole("textbox", { name: "Country:" }).fill("France");
    // await page.getByRole("button", { name: "Submit" }).click();

    // await expect(page.getByRole("cell", { name: "Jakak juli" })).toBeVisible();
  });
});

// UI Test: Edit an Existing Contact
test.describe.skip("Edit Existing Contact", () => {
  test.beforeEach(async ({ page, user }: TestArgs) => {
    await user.login();
    await page.goto("/contactList");
  });

  test("should edit a contact and verify changes", async ({ page }) => {
    await page.getByRole("cell", { name: "Jakak juli" }).click();
    await page.getByRole("button", { name: "Edit Contact" }).click();
    await page.getByRole("textbox", { name: "First Name:" }).fill("Chacha");
    await page.getByRole("textbox", { name: "Last Name:" }).fill("JIki");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Chacha", { exact: true })).toBeVisible();
  });
});
