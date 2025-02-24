import {
  test,
  expect,
  Browser,
  chromium,
  BrowserContext,
  Page
} from '@playwright/test'
import { authenticate } from './helper/authenticate'
import { text } from '../src/consts'
let browser: Browser
let context: BrowserContext
let page: Page

const { describe, beforeEach, afterAll } = test

describe('Dashboard Page', () => {
  beforeEach(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
    await authenticate(page)
  })

  afterAll(async () => {
    await browser.close()
  })

  describe('Page elements', () => {
    test('should have a wrapper', async () => {
      const wrapper = page.getByTestId('clients-section')
      await expect(wrapper).toBeVisible()
    })

    test('should have a navbar', async () => {
      const navbar = page.getByTestId('navbar')
      await expect(navbar).toBeVisible()
    })

    test('should have a total label', async () => {
      const totalLabel = page.getByTestId('clients-total-label')
      await expect(totalLabel).toBeVisible()
    })

    test('should have a items per page select', async () => {
      const itemsPerPageSelect = page.getByTestId('items-per-page-select')
      await expect(itemsPerPageSelect).toBeVisible()
    })

    test('should have a paginator', async () => {
      const paginator = page.getByTestId('paginator')
      await expect(paginator).toBeVisible()
    })

    test('should have a cards wrapping section', async () => {
      const cardsWrapper = page.getByTestId('clients-cards-wrapper')
      await expect(cardsWrapper).toBeVisible()
    })
  })

  describe('Create Client', () => {
    beforeEach(async () => {
      const isFormVisible = await page.getByTestId('client-form').isVisible()
      if (!isFormVisible) {
        await page.getByTestId('client-footer-button').click()
        await expect(page.getByTestId('client-form')).toBeVisible()
      }
    })
    test('should close the create client form when the close button is clicked', async () => {
      await page.getByTestId('close-modal-button').click()
      await expect(page.getByTestId('client-form')).not.toBeVisible()
    })

    test('should show the error message when the name input is empty', async () => {
      await page.getByTestId('client-form-name-input').fill('')
      await page.getByTestId('client-form-button').click()
      await expect(page.getByTestId('client-form-name-error')).toBeVisible()
    })

    test('should show the error message when the sallary input is empty', async () => {
      await page.getByTestId('client-form-sallary-input').fill('')
      await page.getByTestId('client-form-button').click()
      await expect(page.getByTestId('client-form-sallary-error')).toBeVisible()
    })

    test('should show the error message when the company sallary input is empty', async () => {
      await page.getByTestId('client-form-company-sallary-input').fill('')
      await page.getByTestId('client-form-button').click()
      await expect(
        page.getByTestId('client-form-company-sallary-error')
      ).toBeVisible()
    })

    test('should fill the form correctly', async () => {
      await page.getByTestId('client-form-name-input').fill('John Doe')
      await page.getByTestId('client-form-sallary-input').fill('10000')
      await page
        .getByTestId('client-form-company-sallary-input')
        .fill('20000,00')

      await page.route('**/clients', async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({})
        })
      })

      await page.getByTestId('client-form-button').click()
      await expect(page.getByText(text.CREATE_CLIENT_SUCCESS)).toBeVisible()
      await expect(page.getByTestId('client-form')).not.toBeVisible()
    })

    test('should reset the form correctly', async () => {
      await page.getByTestId('client-form-name-input').fill('John Doe')
      await page.getByTestId('client-form-sallary-input').fill('10000')
      await page
        .getByTestId('client-form-company-sallary-input')
        .fill('20000,00')
      await page.getByTestId('close-modal-button').click()
      await expect(page.getByTestId('client-form')).not.toBeVisible()
      await page.getByTestId('client-footer-button').click()
      await expect(page.getByTestId('client-form')).toBeVisible()
      await expect(page.getByTestId('client-form-name-input')).toHaveValue('')
      await expect(page.getByTestId('client-form-sallary-input')).toHaveValue(
        ''
      )
      await expect(
        page.getByTestId('client-form-company-sallary-input')
      ).toHaveValue('')
    })
  })

  describe('Client cards', () => {
    test('should open add and remove the client to the selected list when the button is clicked ', async () => {
      const addClientButton = page.getByTestId('client-add-icon').first()
      await addClientButton.click()
      await expect(page.getByText(text.SELECT_CLIENT_SUCCESS)).toBeVisible()
      const removeClientButton = page.getByTestId('client-remove-icon').first()
      await removeClientButton.click()
      expect(page.getByText(text.DELETE_SELECTED_CLIENT_SUCCESS)).toBeVisible()
    })
    test('should open the update client form when the button is clicked ', async () => {
      const updateClientButton = page
        .getByTestId('client-form-edit-icon')
        .first()
      await updateClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
    })
    test('should open the delete client form when the button is clicked ', async () => {
      const deleteClientButton = page
        .getByTestId('client-form-delete-icon')
        .first()
      await deleteClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
    })

    test('should have a delete client form', async () => {
      const deleteClientButton = page
        .getByTestId('client-form-delete-icon')
        .first()
      await deleteClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
    })
    test('should delete the client when the button is clicked', async () => {
      const deleteClientButton = page
        .getByTestId('client-form-delete-icon')
        .first()
      await deleteClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
      const submitButton = page.getByTestId('client-form-button')

      await page.route('**/clients/*', async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({})
        })
      })
      await submitButton.click()
      await expect(page.getByText(text.DELETE_CLIENT_SUCCESS)).toBeVisible()
    })
  })

  describe('Items per page Selector', () => {
    test('should have a items per page select', async () => {
      const itemsPerPageSelect = page.getByTestId('items-per-page-select')
      await expect(itemsPerPageSelect).toBeVisible()
    })
    test('Should change the items per page when the select is changed', async () => {
      const itemsPerPageSelect = page.getByTestId('items-per-page-select')
      await itemsPerPageSelect.selectOption('15')
      const cardsWrapper = page.getByTestId('clients-cards-wrapper')
      await expect(cardsWrapper.locator('> *')).toHaveCount(15)
    })
  })

  describe('Pagination', () => {
    test('should have a paginator', async () => {
      const paginator = page.getByTestId('paginator')
      await expect(paginator).toBeVisible()
    })

    test('should change the page when the button is clicked', async () => {
      const paginator = page.getByTestId('paginator')
      const currentPage = paginator.locator('ul > li > a[aria-current="page"]')
      expect(currentPage).toHaveText('1')
      const nextButton = paginator.locator('ul > li > a[aria-label="Page 2"]')
      await nextButton.click()
      await expect(currentPage).toHaveText('2')
    })
  })

  describe('Selected clients', () => {
    test('should add and remove a client to the selected clients list when the button is clicked', async () => {
      const firstClientCard = page.getByTestId('client-card-1')
      const secondClientCard = page.getByTestId('client-card-2')

      const firstClientName = await firstClientCard
        .getByTestId('client-form-name')
        .textContent()
      const secondClientName = await secondClientCard
        .getByTestId('client-form-name')
        .textContent()

      await firstClientCard.getByTestId('client-add-icon').click()
      await secondClientCard.getByTestId('client-add-icon').click()

      await expect(
        firstClientCard.getByTestId('client-remove-icon')
      ).toBeVisible()
      await expect(
        secondClientCard.getByTestId('client-remove-icon')
      ).toBeVisible()

      await page.goto('http://localhost/clients?selected=true', {
        waitUntil: 'networkidle'
      })

      await expect(page.getByText(firstClientName as string)).toBeVisible()
      await expect(page.getByText(secondClientName as string)).toBeVisible()

      await page.getByTestId('client-remove-button').last().click()
      await page.getByTestId('client-remove-button').first().click()
      await expect(page.getByText(firstClientName as string)).not.toBeVisible()
      await expect(page.getByText(secondClientName as string)).not.toBeVisible()
    })

    test('should persist the selected clients when the page is refreshed', async () => {
      const firstClientCard = page.getByTestId('client-card-1')
      const secondClientCard = page.getByTestId('client-card-2')

      await firstClientCard.getByTestId('client-add-icon').click()
      await secondClientCard.getByTestId('client-add-icon').click()

      await page.reload()

      await expect(firstClientCard).toBeVisible()
      await expect(secondClientCard).toBeVisible()
    })

    test('should persist the selected clients if the user relogs with the same email', async () => {
      const firstClientCard = page.getByTestId('client-card-1')
      const secondClientCard = page.getByTestId('client-card-2')

      await firstClientCard.getByTestId('client-add-icon').click()
      await secondClientCard.getByTestId('client-add-icon').click()

      await page.goto('http://localhost/clients?selected=true', {
        waitUntil: 'networkidle'
      })

      await page.reload()

      await expect(firstClientCard).toBeVisible()
      await expect(secondClientCard).toBeVisible()

      await page.getByTestId('link-to-logout').click()
      await authenticate(page)

      await page.goto('http://localhost/clients?selected=true', {
        waitUntil: 'networkidle'
      })

      await expect(firstClientCard).toBeVisible()
      await expect(secondClientCard).toBeVisible()
    })

    test('should not persist the selected clients if the user relogs with a different email', async () => {
      const firstClientCard = page.getByTestId('client-card-1')
      const secondClientCard = page.getByTestId('client-card-2')

      await firstClientCard.getByTestId('client-add-icon').click()
      await secondClientCard.getByTestId('client-add-icon').click()

      await page.goto('http://localhost/clients?selected=true', {
        waitUntil: 'networkidle'
      })

      await page.getByTestId('link-to-logout').click()
      await context.clearCookies()
      await context.clearPermissions()
      await page.evaluate(() => localStorage.clear())
      await context.storageState({ path: 'storage-state.json' })
      await authenticate(page)

      await page.goto('http://localhost/login', {
        waitUntil: 'networkidle'
      })

      await page.getByTestId('login-email-input').fill('email@email5.com')
      await page.getByTestId('login-password-input').fill('Dupin#123')
      await page.getByTestId('login-form-button').click()

      await page.goto('http://localhost/clients?selected=true', {
        waitUntil: 'networkidle'
      })

      await expect(firstClientCard).not.toBeVisible()
      await expect(secondClientCard).not.toBeVisible() 
    })
  })

  describe('Navbar', () => {
    beforeEach(async () => {
      await authenticate(page)
    })

    test('should have a navbar', async () => {
      const navbar = page.getByTestId('navbar')
      await expect(navbar).toBeVisible()
    })

    test('should have a user name', async () => {
      const userName = page.getByTestId('user-name')
      await expect(userName).toBeVisible()
    })

    test('should have a side menu', async () => {
      const sideMenu = page.getByTestId('side-menu-icon')
      await expect(sideMenu).toBeVisible()
    })

    test('should have a logo', async () => {
      const logo = page.getByTestId('logo')
      await expect(logo).toBeVisible()
    })

    describe('Links', () => {
      test('should have a link to /about', async () => {
        const aboutLink = page.getByTestId('link-to-about')
        await expect(aboutLink).toBeVisible()
      })

      test('should go to /about when the link is clicked', async () => {
        const aboutLink = page.getByTestId('link-to-about')
        await aboutLink.click()
        await expect(page).toHaveURL('http://localhost/about')
      })

      test('should have a link to /clients', async () => {
        const clientsLink = page.getByTestId('link-to-clients')
        await expect(clientsLink).toBeVisible()
      })

      test('should go to /clients when the link is clicked', async () => {
        const clientsLink = page.getByTestId('link-to-clients')
        await clientsLink.click()
        await expect(page).toHaveURL('http://localhost/clients')
      })

      test('should have a link to selected clients', async () => {
        const selectedClientsLink = page.getByTestId('link-to-selected-clients')
        await expect(selectedClientsLink).toBeVisible()
      })

      test('should go to /clients?selected=true when the link is clicked', async () => {
        const selectedClientsLink = page.getByTestId('link-to-selected-clients')
        await selectedClientsLink.click()
        await expect(page).toHaveURL('http://localhost/clients?selected=true')
      })

      test('should have a logout link', async () => {
        const logoutLink = page.getByTestId('link-to-logout')
        await expect(logoutLink).toBeVisible()
      })

      test('should logout when the logout link is clicked', async () => {
        const logoutLink = page.getByTestId('link-to-logout')
        await logoutLink.click()
        const cookies = await context.cookies()
        expect(cookies).toHaveLength(0)
        await expect(page.getByTestId('create-user-step1-form')).toBeVisible()
      })
    })

    describe('Side menu', () => {
      test('should open a side menu when the icon is clicked', async () => {
        const sideMenu = page.getByTestId('side-menu-icon')
        await sideMenu.click()
        await expect(page.getByTestId('overlay')).toBeVisible()
        await expect(page.getByTestId('side-menu')).toBeVisible()
      })
      test('should close the side menu when the overlay is clicked', async () => {
        const sideMenu = page.getByTestId('side-menu-icon')
        await sideMenu.click()
        await expect(page.getByTestId('overlay')).toBeVisible()
        await expect(page.getByTestId('side-menu')).toBeVisible()
        await page.getByTestId('side-menu-close-button').click()
        await expect(page.getByTestId('overlay')).not.toBeVisible()
        await expect(page.getByTestId('side-menu')).not.toBeVisible()
      })
    })
  })

  describe('Client Page', () => {
    test('should go to homepage if the user is not authenticated', async () => {
      await page.goto('http://localhost/clients', {
        waitUntil: 'networkidle'
      })
      await context.clearCookies();
      await context.clearPermissions();
      await page.reload()
      await expect(page).toHaveURL('http://localhost/')
    })
  })
})
