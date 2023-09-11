import { LogInPage } from '@/pages/login/Login'

describe('Suite login page', () => {
  it('should login with success', () => {
    const login = new LogInPage()

    login.visit()
    login.fillEmail('guilherme.andrade@tallos.com.br')
    login.fillPassword('18102019')
    login.submit()

    cy.wait(8000)
    cy.get('body').type('{esc}')
  })
})
