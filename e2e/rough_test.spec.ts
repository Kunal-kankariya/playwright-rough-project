import { expect, test } from '@playwright/test';
import { login } from '../utils/common';

test.describe('UI validation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page); // 🔐 Login before each test
  });

  test('Valid login', async ({ page }) => {
    const btnText = await page.locator('div[data-test="inventory-item"] button').first().textContent()
    const discriptionText = await page.locator('div[data-test="inventory-item-description"]  a').first().textContent() as string
    const itemPriceText = await page.locator('div[data-test="inventory-item"] [data-test="inventory-item-price"]').first().textContent()  as string
    console.log('itemPriceText', itemPriceText); // ✅ Simple test case
    console.log('btnText', btnText); // ✅ Simple test case
    console.log('discriptionText', discriptionText); // ✅ Simple test case
    expect(btnText).toBe('Add to cart')
    await page.locator('div[data-test="inventory-item"] button').first().click();
    const AddedCartBtnText = await page.locator('div[data-test="inventory-item"] button').first().textContent()
    console.log('AddedCartBtnText', AddedCartBtnText); // ✅ Simple test case
    expect(AddedCartBtnText).toBe('Remove')
    await page.locator('[data-test="shopping-cart-link"]').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    await expect(page.locator('[data-test="cart-list"]')).toHaveCount(1)
    await expect(page.locator('[data-test="cart-list"]')).toContainText(discriptionText)
    await expect(page.locator('[data-test="cart-list"]')).toContainText(itemPriceText)
    await page.getByRole('button', {name: 'Checkout'}).click()
    await expect(page.getByText('Checkout: Your Information')).toBeVisible()
    await page.getByPlaceholder('First Name').fill('john')
    await page.getByPlaceholder('Last Name').fill('doe')
    await page.getByPlaceholder('Zip/Postal Code').fill('123456')
    await page.locator('[data-test="continue"]').click()
    await expect(page.getByText(discriptionText)).toBeVisible()
    await expect(page.getByText(itemPriceText).first()).toBeVisible()
    await page.getByRole('button', {name: 'finish'}).click()
    await expect(page.getByText('Thank you for your order!')).toBeVisible()
    await page.getByRole('button', {name: 'Back Home'}).click()
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible()
  });
  
  test.fixme('Valid login new', async ({ page }) => {
    console.log('fix it'); // ✅ Simple test case
  });


});

