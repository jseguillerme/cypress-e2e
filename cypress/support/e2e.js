// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (_err, runnable) => {
  return false
})
