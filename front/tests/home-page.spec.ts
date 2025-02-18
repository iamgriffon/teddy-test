import { test, expect, Browser, chromium, BrowserContext, Page } from '@playwright/test'


let browser: Browser
let context: BrowserContext
let page: Page

const { describe, beforeEach, afterAll } = test;

describe('Homepage', () => {
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
      const form = page.getByTestId('homepage-form')
      await expect(form).toBeVisible()
    })
  
    test('should have a title', async () => {
      const title = page.getByTestId('homepage-title')
      await expect(title).toBeVisible()
    })
  
    test('should have a input', async () => {
      const input = page.getByTestId('homepage-input')
      await expect(input).toBeVisible()
    })
  
    test('should have a button', async () => {
      const button = page.getByTestId('homepage-button')
      await expect(button).toBeVisible()
    })
  })

  describe('It should have the correct behavior', () => {
    test('should redirect to the users page when the form is submitted', async () => {
      const input = page.getByTestId('homepage-input')
      await input.fill('John Doe')
      await page.getByTestId('homepage-button').click()
      await expect(page.getByText('Olá, John Doe!')).toBeVisible()
    })
  })
})
