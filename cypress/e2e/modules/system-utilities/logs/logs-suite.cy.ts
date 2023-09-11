import { LogsPage } from '@/pages/modules/system-utilities/logs/Logs'
import { LogInPage } from '@/pages/login/Login'
import { Navigation } from '@/global/navigation.cy'
import { timing } from '@/fixtures/timing'

describe('Suite logs page', () => {
  const pageLogs = new LogsPage()
  const pageLogin = new LogInPage()

  beforeEach(() => {
    pageLogin.visit()
    pageLogin.fillEmail(`${Cypress.env('USER_VALID_TEST').EMAIL_USER}`)
    pageLogin.fillPassword(`${Cypress.env('USER_VALID_TEST').PASS_USER}`)
    pageLogin.submit()
    pageLogs.goToLogs()
    pageLogs.confirmLogsPage()
  })

  context('Tests - breadcrumbs links', () => {
    it('should be able to visit breadcrumbs', () => {
      cy.get('body').type('{esc}', { delay: 5000 })
      Navigation.visitBreadcrumbs()
    })
  })

  context('Tests - values limits in table logs', () => {
    it('should be able to change results per page', () => {
      cy.get('body').type('{esc}', { force: true })
      cy.get('[data-cy=cy-table-limit]>button').click({ force: true })
      cy.wait(timing.afterRead)
      for (let i = 0; i < 6; i++) {
        cy.get('[data-cy=cy-table-item]').eq(i).click({ force: true })
      }
    })

    it('should be able to show results in first and last page', () => {
      // intercept in route of logs, to get the response with values of logs, pages, etc...
      cy.intercept(
        `${Cypress.env('KONG_MEGASAC_API')}/logs/${Cypress.env(
          'COMPANY_ID_TEST',
        )}/all/?page=1`,
      ).as('LogsResult')

      // click in button esc to close modal (prevent error in test)
      cy.get('body').type('{esc}', { delay: 1000 })

      // click in button to change limit of results per page
      cy.get('[data-cy=cy-table-limit]>button').click({ force: true })
      cy.wait(timing.afterRead)

      // click in first item of select to change limit of results per page to first option
      cy.get('[data-cy=cy-table-item]').first().click({ force: true })

      // wait to get response of logs
      cy.wait('@LogsResult').then((intercept) => {
        // expect the data table items to be visible
        cy.get('table > tbody > tr').each(($el, index) => {
          Cypress.dom.isVisible($el)
        })

        cy.wait(1000)

        // click in button to last page of logs
        cy.get('[data-cy="cy-data-table-pages"] > li')
          .last()
          .children()
          .click({ force: true, timeout: 2000, multiple: true })

        // expect the data table items to be visible
        cy.get('table > tbody > tr').each(($el, index, $list) => {
          Cypress.dom.isVisible($el)
        })
      })
    })
  })

  context('Tests - search logs', () => {
    it('should be able to search logs by event', () => {
      cy.get('[data-cy="cy-searchbar"]').type('Entrou no Sistema', {
        force: true,
      })

      cy.wait(1000)

      cy.get('table > tbody > tr').each(($el, index) => {
        expect(Cypress.dom.isVisible($el)).eq(true)
        console.log($el)
        $el.each(($td, index) => {})
      })
    })
  })
})
