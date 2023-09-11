export class LogInPage {
  private readonly emailInput = '[type="email"]'
  private readonly passwordInput = '[type="password"]'
  private readonly submitButton = '[data-cy="cy-login-btn"]'

  visit() {
    cy.visit(`${Cypress.env('BASE_URL')}`)
  }

  fillEmail(email: string) {
    cy.get(this.emailInput).type(email, { force: true })
  }

  fillPassword(password: string) {
    cy.get(this.passwordInput).type(password, { force: true })
  }

  submit() {
    cy.get(this.submitButton).click()
  }
}
