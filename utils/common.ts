import { expect } from "@playwright/test";

const userName = process.env.TEST_USER_EMAIL as string
const password = process.env.TEST_USER_PASS as string

export const login = async (page:any)=>{
    await page.goto('/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await expect(page).toHaveTitle('Swag Labs')
    await page.getByPlaceholder('Username').fill(userName)
    await page.getByPlaceholder('Password').fill(password)
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible()
}