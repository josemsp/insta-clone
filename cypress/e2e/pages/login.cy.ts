import {
  button_loginButtonSelector,
  button_signUpButtonSelector,
  errorSelector,
  input_emailSelector,
  input_fullNameSelector,
  input_passwordSelector,
  input_usernameSelector,
  link_signUpLinkSelector
} from "../../support/selectors"
import { User } from '../../fixtures/user'


describe('Render login page', () => {
  let userData: User;

  beforeEach(() => {
    cy.fixture<User>('user-testing').as('userData').then((user) => {
      userData = user;
    })
    cy.visit('/login')
  })

  it('renders login page', () => {
    cy.get('img[alt="Insta Clone"]').should('be.visible')
    cy.get(input_emailSelector).should('be.visible')
    cy.get(input_passwordSelector).should('be.visible')
    cy.get(button_loginButtonSelector).should('be.visible')
  })

  it('renders error message', () => {
    cy.get(input_emailSelector).type('invalid@email.com')
    cy.get(input_passwordSelector).type('invalid')
    cy.get(button_loginButtonSelector).click()
    cy.get(errorSelector).should('be.visible')
  })

  it('redirects to sign up page', () => {
    cy.get(link_signUpLinkSelector).click()
    cy.url().should('include', '/signup')
    cy.get(input_usernameSelector).should('be.visible')
    cy.get(input_fullNameSelector).should('be.visible')
    cy.get(input_emailSelector).should('be.visible')
    cy.get(input_passwordSelector).should('be.visible')
    cy.get(button_signUpButtonSelector).should('be.visible')
  })

  it('login successfully and redirects to dashboard', () => {
    cy.loginUser(userData.email, userData.password);
    cy.window().title().should('include', 'Insta Clone - Dashboard')
  })
})
