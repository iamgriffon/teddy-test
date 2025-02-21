import {
  test,
  expect,
  Browser,
  chromium,
  BrowserContext,
  Page
} from '@playwright/test'
import { text } from '../src/consts'
import { authenticate } from './helper/authenticate'
let browser: Browser
let context: BrowserContext
let page: Page

const { describe, beforeEach, afterAll } = test

describe('Homepage', async () => {
  beforeEach(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto('http://localhost/')
    await page.waitForLoadState('networkidle')
  })

  afterAll(async () => {
    await browser.close()
  })

  describe('It should contain all the elements', () => {
    test('should have a form', async () => {
      const form = page.getByTestId('create-user-step1-form')
      await expect(form).toBeVisible()
    })

    test('should have a title', async () => {
      const title = page.getByTestId('create-user-step1-title')
      await expect(title).toBeVisible()
    })

    test('should have a input', async () => {
      const input = page.getByTestId('create-user-name-input')
      await expect(input).toBeVisible()
    })

    test('should have a button', async () => {
      const button = page.getByTestId('create-user-step1-button')
      await expect(button).toBeVisible()
    })

    test('should have a link to login page', async () => {
      const link = page.getByTestId('create-user-login-link')
      await expect(link).toBeVisible()
    })
  })

  describe('Create User Form', () => {
    test('should show the error message when the input is empty', async () => {
      const button = page.getByTestId('create-user-step1-button')
      await button.click()
      await expect(page.getByTestId('create-user-name-error')).toBeVisible()
    })

    test('should redirect to the next page when the form is submitted', async () => {
      const input = page.getByTestId('create-user-name-input')
      await input.fill('John Doe')
      await page.getByTestId('create-user-step1-button').click()
      await expect(page.getByTestId('create-user-step2-form')).toBeVisible()
    })

    test('should redirect to the login page when the link is clicked', async () => {
      const link = page.getByTestId('create-user-login-link')
      await link.click()
      await expect(page.getByTestId('login-form')).toBeVisible()
    })

    describe('Create User Form Step 2', () => {
      beforeEach(async () => {
        const input = page.getByTestId('create-user-name-input')
        await input.fill('John Doe')
        await page.getByTestId('create-user-step1-button').click()
        await expect(page.getByTestId('create-user-step2-form')).toBeVisible()
      })

      test('should show the error message when the email is empty', async () => {
        const button = page.getByTestId('create-user-step2-button')
        await button.click()
        await expect(page.getByTestId('create-user-email-error')).toBeVisible()
      })

      test('should show the error message when the email is invalid', async () => {
        const input = page.getByTestId('create-user-email-input')
        await input.fill('invalid-email')
        await page.getByTestId('create-user-step2-button').click()
        await expect(page.getByTestId('create-user-email-error')).toBeVisible()
      })

      test('should show the error message when the password is empty', async () => {
        const button = page.getByTestId('create-user-step2-button')
        await button.click()
        await expect(page.getByTestId('create-user-password-error')).toBeVisible()
      })

      test('should show the error message when the password is invalid', async () => {
        const input = page.getByTestId('create-user-password-input')
        await input.fill('12345678')
        await page.getByTestId('create-user-step2-button').click()
        await expect(page.getByTestId('create-user-password-error')).toBeVisible()
      })
    })
  })

  describe('Login Form', () => {
    test('should show the error message when the inputs are empty', async () => {
      await page.goto('http://localhost/login')
      await page.getByTestId('login-form-button').click()
      await expect(page.getByTestId('login-email-error')).toBeVisible()
      await expect(page.getByTestId('login-password-error')).toBeVisible()
    })
    test('should redirect to the clients page when the form is submitted', async () => {
      const newPage = await authenticate(page)
      await expect(newPage.getByTestId('clients-section')).toBeVisible()
    })
  })
})
