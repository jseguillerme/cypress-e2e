import { LogsPage } from '@/pages/modules/system-utilities/logs/Logs'
import { LogInPage } from '@/pages/login/Login'

context('Suite logs page', () => {
  const sut = new LogsPage()
  const login = new LogInPage()

  beforeEach(() => {
    login.visit()
    login.fillEmail(`${Cypress.env('USER_VALID_TEST').EMAIL_USER}`)
    login.fillPassword(`${Cypress.env('USER_VALID_TEST').PASS_USER}`)
    login.submit()
  })

  it('should be able to open logs page', () => {
    sut.goToLogs()
    sut.confirmLogsPage()
  })
})
