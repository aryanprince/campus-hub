import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("should create a random new user", async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  await page.goto("http://localhost:3000/signup");
  await page.getByLabel("First Name").fill(firstName);
  await page.getByLabel("Last Name").fill(lastName);
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByText("Sign Up").click();

  await expect(page.getByText("Good morning")).toBeVisible();
});
