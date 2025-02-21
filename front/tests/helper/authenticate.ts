import { Page } from '@playwright/test'
export const authenticate = async (page: Page) => {
  await page.goto('http://localhost/login')
  await page.getByTestId('login-email-input').fill('email@email2.com')
  await page.getByTestId('login-password-input').fill('12345678')
  await page.getByTestId('login-form-button').click()
  await page.waitForLoadState('networkidle')
  return page
}
