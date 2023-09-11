import { CustomersContacts } from '@/pages/modules/customers-messages/customers-contacts/customersContacts'
import { LogInPage } from '@/pages/login/Login'

context('Sub-Module Customers Contacts - Open View List Contacts', () => {
  const pageLogin = new LogInPage()
  const pageCustomersContacts = new CustomersContacts()

  beforeEach(() => {
    pageLogin.visit()
    pageLogin.fillEmail(`${Cypress.env('USER_VALID_TEST').EMAIL_USER}`)
    pageLogin.fillPassword(`${Cypress.env('USER_VALID_TEST').PASS_USER}`)
    pageLogin.submit()
  })

  it('Open View List Contacts', () => {
    pageCustomersContacts.goToCustomersContactsPage()
    pageCustomersContacts.confirmViewContacts()
  })
})
