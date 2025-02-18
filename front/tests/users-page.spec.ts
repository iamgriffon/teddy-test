import {
  test,
  expect,
  Browser,
  chromium,
  BrowserContext,
  Page
} from '@playwright/test'

let browser: Browser
let context: BrowserContext
let page: Page

const { describe, beforeEach, afterAll } = test

describe('Users Page', () => {
  beforeEach(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto('http://localhost/')
    await page.getByTestId('homepage-input').fill('John Doe')
    await page.getByTestId('homepage-button').click()
    await page.goto('http://localhost/clients')
    await page.waitForLoadState('networkidle')
  })

  afterAll(async () => {
    await browser.close()
  })

  describe('It should contain all the elements', () => {
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
    test('should open the create client form when the button is clicked   ', async () => {
      const createClientButton = page.getByTestId('create-client-button')
      await createClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
    })

    test('should close the create client form when the close button is clicked', async () => {
      const createClientButton = page.getByTestId('create-client-button')
      await createClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
      const closeModalButton = page.getByTestId('close-modal-button')
      await closeModalButton.click()
      await expect(page.getByTestId('client-form')).not.toBeVisible()
    })

    test('should fill the form correctly', async () => {
      const createClientButton = page.getByTestId('create-client-button')
      await createClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
      const nameInput = page.getByTestId('client-form-name-input')
      await nameInput.fill('John Doe')
      const sallaryInput = page.getByTestId('client-form-sallary-input')
      await sallaryInput.fill('10000')
      const companySallaryInput = page.getByTestId(
        'client-form-company-sallary-input'
      )
      await companySallaryInput.fill('20000,00')
      const submitButton = page.getByTestId('client-form-button')
      await page.route('**/clients', async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({})
        })
      })

      await submitButton.click()

      await expect(page.getByText('Cliente criado com sucesso!')).toBeVisible()
      await expect(page.getByTestId('client-form')).not.toBeVisible()
    })

    test('should reset the form correctly', async () => {
      const createClientButton = page.getByTestId('create-client-button')
      const nameInput = page.getByTestId('client-form-name-input')
      const sallaryInput = page.getByTestId('client-form-sallary-input')
      const companySallaryInput = page.getByTestId(
        'client-form-company-sallary-input'
      )

      await createClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
      await nameInput.fill('John Doe')
      await sallaryInput.fill('10000')
      await companySallaryInput.fill('20000,00')
      const closeModalButton = page.getByTestId('close-modal-button')
      await closeModalButton.click()

      await expect(page.getByTestId('client-form')).not.toBeVisible()
      await createClientButton.click()
      await expect(page.getByTestId('client-form')).toBeVisible()
      await expect(nameInput).toHaveValue('')
      await expect(sallaryInput).toHaveValue('')
      await expect(companySallaryInput).toHaveValue('')
    })
  })

  describe('Client cards', () => {
    test('should open add and remove the client to the selected list when the button is clicked ', async () => {
      const addClientButton = page.getByTestId('client-add-icon').first()
      await addClientButton.click()
      await expect(page.getByText('adicionado com sucesso!')).toBeVisible()
      const removeClientButton = page.getByTestId('client-remove-icon').first()
      await removeClientButton.click()
      expect(page.getByText('removido com sucesso!')).toBeVisible()
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
      await expect(page.getByText('Cliente deletado com sucesso!')).toBeVisible()
    })
  })

  describe('Items per page', () => {
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
    test('should add a client to the selected clients list when the button is clicked', async () => {
      await page.goto('http://localhost/clients')
      const addClientButton = page.getByTestId('client-add-icon').first()
      await addClientButton.click()
      expect(page.getByText('adicionado com sucesso!')).toBeVisible()
      await page.getByTestId('link-to-selected-clients').click()
      await page.waitForURL('http://localhost/clients?selected=true')
      const removeClientButton = page.getByTestId('client-remove-icon').first()
      expect(removeClientButton).toBeVisible()
      await removeClientButton.click()
      expect(page.getByText('removido com sucesso!')).toBeVisible()
    })
  })

  describe('Side menu', () => {
    test('should have a side menu', async () => {
      const sideMenu = page.getByTestId('side-menu-icon')
      await expect(sideMenu).toBeVisible()
    })
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
