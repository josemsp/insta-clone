import { User } from "../../fixtures/user";
import {
  input_usernameSelector,
  input_fullNameSelector,
  input_emailSelector,
  input_passwordSelector,
  button_signUpButtonSelector,
  errorSelector
} from "../../support/selectors"

describe('Render Sign Up page', () => {
  let userData: User;
  let userExistentData: User;

  beforeEach(() => {
    cy.fixture('user-testing').as('userData').then((user) => {
      userData = user;
    })
    cy.fixture('user-existent').as('userExistentData').then((user) => {
      userExistentData = user;
    })
    cy.visit('/signup')
  })

  it('renders Sign Up page', () => {
    cy.get(input_usernameSelector).should('be.visible')
    cy.get(input_fullNameSelector).should('be.visible')
    cy.get(input_emailSelector).should('be.visible')
    cy.get(input_passwordSelector).should('be.visible')
    cy.get(button_signUpButtonSelector).should('be.visible')
  })

  it('renders error message', () => {
    cy.get(input_usernameSelector).type(userData.username)
    cy.get(input_fullNameSelector).type(userData.fullName)
    cy.get(input_emailSelector).type(userExistentData.email)
    cy.get(input_passwordSelector).type(userData.password)
    cy.get(button_signUpButtonSelector).click()

    cy.get(errorSelector).should('be.visible')
  })

  it('redirects to login page', () => {
    cy.get('[data-cy="login-link"]').click()
    cy.url().should('include', '/login')
  })

  it('sign up successfully and redirects to dashboard', () => {
    cy.get(input_usernameSelector).type(userData.username)
    cy.get(input_fullNameSelector).type(userData.fullName)
    cy.get(input_emailSelector).type(userData.email)
    cy.get(input_passwordSelector).type(userData.password)
    cy.get(button_signUpButtonSelector).click()

    cy.url().should('include', '/')
  })
})