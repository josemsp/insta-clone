// Import commands.js using ES2015 syntax:
// import { User } from '../fixtures/user';
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

afterEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});
