interface RegisterContactsProps {
  name: string
  email: string
  phone: string
}

export class CustomersContacts {
  goToCustomersContactsPage() {
    cy.wait(600)
    // click in submodule customers contacts
    cy.get('[data-cy="cy-sub-sidebar-contacts"]')
      .children()
      .click({ force: true })
  }

  confirmViewContacts() {
    cy.wait(1000)
    cy.url().should('include', '/contacts/customers')
  }

  fillFormRegisterContact({ email, name, phone }: RegisterContactsProps) {
    cy.get('[data-cy="cy-personal-info-contact-toggle-collapse"]').click({
      force: true,
    })
    cy.get('[data-cy="cy-contacts-field-contact-name"]').type(name, {
      force: true,
    })
    cy.get('[data-cy="cy-contacts-field-select-chip"]').select(1, {
      force: true,
    })
    cy.get('[data-cy="cy-contacts-field-contact"]').type(phone, { force: true })
    cy.get('[data-cy="cy-contacts-field-email"]').type(email, { force: true })

    cy.get('[data-cy="cy-contacts-form-opt-in"]').check({ force: true })
  }

  submitFormRegisterContact() {
    cy.intercept(
      `${Cypress.env(
        'KONG_MEGASAC_API',
      )}/whatsapp-official/create/${Cypress.env('COMPANY_ID_TEST')}`,
    ).as('RequestRegisterContact')

    cy.get('[data-cy="cy-contacts-form-btn-register"]').click({
      multiple: true,
      force: true,
    })
    cy.wait('@RequestRegisterContact').then((interception) => {
      const res = interception.response
      expect(res.statusCode).to.eq(201)
    })
  }

  searchContact(phone: string) {
    cy.intercept(
      `${Cypress.env(
        'KONG_MEGASAC_API',
      )}/contacts-manager/contacts/${Cypress.env(
        'COMPANY_ID_TEST',
      )}/search/?page=1`,
    ).as('RequestCheckContactExists')

    cy.get('[data-cy="cy-searchbar"]')
      .eq(1)
      .type(phone, { force: true, delay: 500 })
    cy.get('[data-cy="cy-data-table-select"]')
      .select('cel_phone', { force: true })
      .should('have.value', 'cel_phone')
    cy.wait(1000)
    cy.wait('@RequestCheckContactExists', { responseTimeout: 1000 }).then(
      ($response) => {
        expect($response.response.statusCode).to.eq(200)
      },
    )
  }

  removeContactsByPhone() {
    cy.intercept(
      `${Cypress.env(
        'KONG_MEGASAC_API',
      )}/contacts-manager/contacts/${Cypress.env('COMPANY_ID_TEST')}`,
    ).as('RequestDeleteContact')

    cy.wait(1000)
    cy.get('[data-cy="cy-data-table-actions"]')
      .children()
      .last()
      .within(() => {
        cy.get('span > i').click({ force: true }).click({ force: true })
      })

    cy.get('[data-cy="cy-contacts-modal-remove-contact-confirm-btn"]')
      .should('be.visible')
      .click({ force: true })

    cy.wait('@RequestDeleteContact').then(($response) => {
      expect($response.response.statusCode).to.eq(200)
    })
  }
}
