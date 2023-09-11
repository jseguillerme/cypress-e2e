export class LogsPage {
  goToLogs() {
    // click in hamburger menu to open sidebar
    cy.get('[data-cy="cy-topnav-open"]').click({ force: true })
    // click in module system utilities
    cy.get('[data-cy="cy-sidebar-system-utilities"]').click({ force: true })
    // click in logs
    cy.get('[data-cy="cy-sub-sidebar-logs"] > a').click({ force: true })
  }

  goToLogsByURL() {
    cy.visit(`${Cypress.env('BASE_URL')}/#/app/logs`)
  }

  confirmLogsPage() {
    cy.url({ timeout: 6000 }).should('include', '/app/logs')
  }
}
