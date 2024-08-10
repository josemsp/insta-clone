/// <reference types="cypress" />

import { User } from "../fixtures/user";
import { button_loginButtonSelector, input_emailSelector, input_passwordSelector } from "./selectors";

const loginUser = (email: string, password: string) => {
  cy.visit('/login');
  cy.get(input_emailSelector).type(email);
  cy.get(input_passwordSelector).type(password);
  cy.get(button_loginButtonSelector).click();

  cy.url().should('not.include', '/login');
}

// Cypress.Commands.addAll({ loginUser });
Cypress.Commands.add('loginUser', loginUser);

Cypress.Commands.add('loginCache', () => {
  cy.session('login-session', () => {
    cy.fixture<User>('user-testing').as('userData').then((user) => {
      const { email, password } = user;
      cy.visit('/login');
      cy.loginUser(email, password);
    })
  }, {
    cacheAcrossSpecs: true,
  });

});

