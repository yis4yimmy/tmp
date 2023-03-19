import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should have the correct title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Testing My Patience/i);
  });

  test("should have at least one blog post", async ({ page }) => {
    await page.goto("/blog");

    const postLinks = await page.getByRole("listitem").all();

    expect(postLinks.length).toBeGreaterThanOrEqual(1);
  });

  test("should have no more than 3 blog posts", async ({ page }) => {
    await page.goto("/blog");

    const postLinks = await page.getByRole("listitem").all();

    expect(postLinks.length).toBeLessThanOrEqual(3);
  });
});

test.describe("Navigation", () => {
  test("should navigate to the blog listing", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Blog", exact: true }).click();

    await expect(page).toHaveURL(/.*blog/);
  });

  test("should navigate to the about page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "About", exact: true }).click();

    await expect(page).toHaveURL(/.*about/);
  });

  test("should navigate to GitHub", async ({ context, page }) => {
    await page.goto("/");

    const newPagePromise = context.waitForEvent("page");

    await page.getByRole("link", { name: "GitHub", exact: true }).click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(/.*github\.com\/yis4yimmy/);
  });
});

test.describe("Footer", () => {
  test("should display the copyright", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText(/All rights reserved [0-9]{4}, Jim Schuster/i)
    ).toBeVisible();
  });

  test("should link to the privacy policy", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: "Privacy Policy", exact: true })
      .click();

    await expect(page).toHaveURL(/.*privacy-policy/);
  });
});

test.describe("Blog Listing", () => {
  test("should have at least one blog post", async ({ page }) => {
    await page.goto("/blog");

    const postLinks = await page.getByRole("listitem").all();

    expect(postLinks.length).toBeGreaterThanOrEqual(1);
  });
});
