import { timing } from '@/fixtures/timing'

export class Navigation {
  static pagination() {}

  static visitBreadcrumbs() {
    cy.get(`[data-cy=cy-breadcrumb-btn]>li>a`).then(($value) => {
      for (let i = 0; i < $value.length; i++) {
        cy.get(`[data-cy="cy-breadcrumb-btn"]>li>a`)
          .eq(i)
          .should('have.attr', 'href')
          .then(($href) => {
            cy.get(`[data-cy="cy-breadcrumb-btn"]>li>a`)
              .eq(i)
              .click({ force: true })
              .wait(timing.atomic)
            cy.url().should('include', $href)
            cy.go('back').wait(timing.atomic)
          })
      }
    })
  }
}
