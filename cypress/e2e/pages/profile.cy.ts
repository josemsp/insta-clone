import { User } from "../../fixtures/user"

describe('Render profile page - From menu', () => {
  it('go to profile page from menu', () => {
    cy.loginCache()
    cy.fixture<User>('user-testing').as('userData').then((user) => {
      cy.visit('/')
      cy.get('[data-cy="profile-button"]').click()
      cy.get('[data-cy="profile-header-username"]').should('be.visible').and('have.text', user.username)
    })

  })
})

describe('Render profile page - From url', () => {
  let userData: User;

  beforeEach(() => {
    cy.loginCache()
    cy.fixture<User>('user-testing').as('userData').then((user) => {
      userData = user;
      cy.visit(`/${userData.username}`)
    })
  })

  it('renders profile page', () => {
    cy.get('[data-cy="profile-header-username"]').should('be.visible').and('have.text', userData.username)
  })

  it('edit profile - change photo', () => {
    cy.get('[data-cy="profile-edit-button"]').click()
    cy.get('[data-cy="select-image-input"]').selectFile('cypress/fixtures/profile-test.jpg', { force: true })
    cy.get('[data-cy="confirm-message-profile"]').should('exist').and('be.visible');
    cy.get('[data-cy="confirm-button-profile"]').click()
  })

  it('edit profile - change photo cancel', () => {
    cy.get('[data-cy="profile-edit-button"]').click()
    cy.get('[data-cy="select-image-input"]').selectFile('cypress/fixtures/profile-test.jpg', { force: true })
    cy.get('[data-cy="confirm-message-profile"]').should('exist').and('be.visible');
    cy.get('[data-cy="cancel-button-profile"]').click()
  })

  it('edit profile - change bio', () => {
    cy.get('[data-cy="profile-edit-button"]').click()
    cy.get('[data-cy="bio-input"]').type('test bio')
    cy.get('[data-cy="save-button"]').click()
  })

})
