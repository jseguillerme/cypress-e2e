import { CustomersContacts } from '@/pages/modules/customers-messages/customers-contacts/customersContacts'
import { LogInPage } from '@/pages/login/Login'

describe('SUBMODULE - CUSTOMERS CONTACTS', () => {
  const pageLogin = new LogInPage()
  const pageCustomersContacts = new CustomersContacts()

  beforeEach(() => {
    pageLogin.visit()
    pageLogin.fillEmail(`${Cypress.env('USER_VALID_TEST').EMAIL_USER}`)
    pageLogin.fillPassword(`${Cypress.env('USER_VALID_TEST').PASS_USER}`)
    pageLogin.submit()

    pageCustomersContacts.goToCustomersContactsPage()
    pageCustomersContacts.confirmViewContacts()
  })

  describe('SEARCH CONTACT', () => {
    it('should be able to search a contact', () => {
      cy.get('body').type('{esc}', { force: true })
      pageCustomersContacts.searchContact(`${Cypress.env('CONTACT_PHONE')}`)
    })
  })

  describe('REGISTER CONTACT', () => {
    it('should be able to register a contact with success', () => {
      cy.wait(1000)
      cy.get('body').type('{esc}', { force: true })
      let retry = false
      cy.intercept(
        `${Cypress.env(
          'KONG_MEGASAC_API',
        )}/contacts-manager/contacts/${Cypress.env(
          'COMPANY_ID_TEST',
        )}/phone/exists`,
      ).as('RequestCheckContactExists')

      cy.wait(700)
      cy.get('body').type('{esc}', { force: true })

      pageCustomersContacts.fillFormRegisterContact({
        email: `${Cypress.env('CONTACT_EMAIL')}`,
        name: `${Cypress.env('CONTACT_NAME')}`,
        phone: `${Cypress.env('CONTACT_PHONE')}`,
      })

      cy.wait('@RequestCheckContactExists', { timeout: 600 }).then(
        ($interception) => {
          if ($interception.response.statusCode === 200) {
            retry = true
            cy.wait(400)
            pageCustomersContacts.searchContact(
              `${Cypress.env('CONTACT_PHONE')}`,
            )
            cy.wait(400)
            pageCustomersContacts.removeContactsByPhone()
          }
          pageCustomersContacts.submitFormRegisterContact()
        },
      )

      if (retry) {
        cy.wait(400)
        pageCustomersContacts.fillFormRegisterContact({
          email: `${Cypress.env('CONTACT_EMAIL')}`,
          name: `${Cypress.env('CONTACT_NAME')}`,
          phone: `${Cypress.env('CONTACT_PHONE')}`,
        })
        pageCustomersContacts.submitFormRegisterContact()
      }
    })
  })

  describe('REMOVE CONTACT', () => {
    it('should be able to search a contact and remove it', () => {
      cy.wait(1000)
      cy.get('body').type('{esc}', { force: true })
      cy.intercept(
        `${Cypress.env(
          'KONG_MEGASAC_API',
        )}/contacts-manager/contacts/${Cypress.env(
          'COMPANY_ID_TEST',
        )}/search/?page=1`,
      ).as('RequestCheckContactExists')

      cy.wait(700)
      cy.get('body').type('{esc}', { force: true })

      pageCustomersContacts.searchContact(`${Cypress.env('CONTACT_PHONE')}`)

      cy.wait('@RequestCheckContactExists').then(($response) => {
        if ($response.response.body.docs.length > 0) {
          pageCustomersContacts.removeContactsByPhone()
        }
      })
    })
  })
})
