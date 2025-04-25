import{expect, test} from '@playwright/test'

test('Valid login', async({page})=>{
  await page.goto('https://www.saucedemo.com/')
  await expect(page).toHaveURL('https://www.saucedemo.com/')
  await expect(page).toHaveTitle('Swag Labs')
  await page.getByPlaceholder('Username').fill('standard_user')
  await page.getByPlaceholder('Password').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible()
  
})