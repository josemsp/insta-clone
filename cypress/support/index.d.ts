/// <reference types="cypress" />

export { }
declare global {
  namespace Cypress {
    interface Chainable {
      loginUser(email: string, password: string): Chainable<void>;
      loginCache(): Chainable<void>;
    }
  }
}

