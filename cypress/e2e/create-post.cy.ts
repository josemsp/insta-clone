describe('Create post', () => {
  beforeEach(() => {
    cy.loginCache()
    cy.visit('/')
    cy.get('[data-cy="create-post-button"]').click()
  })

  it('open create post modal', () => {
    cy.get('[data-cy="create-post-header-title"]').should('be.visible').and('have.text', 'Create new post')
  })

  it('open close modal', () => {
    cy.get('[data-cy="create-post-header-title"]').should('be.visible').and('have.text', 'Create new post')
    cy.get('[data-cy="modal-close-button"]').click()
    cy.get('[data-cy="create-post-header-title"]').should('not.exist')
  })

  it('select image, back and close modal', () => {
    cy.get('[data-cy="select-image-input"]').selectFile('cypress/fixtures/image-test.jpg', { force: true })
    cy.get('[data-cy="create-post-header-title"]').should('be.visible').and('have.text', 'Preview')
    cy.get('[data-cy="create-post-back-button"]').click()
    cy.get('[data-cy="create-post-header-title"]').should('be.visible').and('have.text', 'Create new post')
    cy.get('[data-cy="modal-close-button"]').click()
    cy.get('[data-cy="create-post-header-title"]').should('not.exist')
  })

  it('select image', () => {
    cy.get('[data-cy="select-image-input"]').selectFile('cypress/fixtures/image-test.jpg', { force: true })
    cy.get('[data-cy="create-post-header-title"]').should('be.visible').and('have.text', 'Preview')
  })

  it('add caption and publish', () => {
    cy.get('[data-cy="select-image-input"]').selectFile('cypress/fixtures/image-test.jpg', { force: true })
    cy.get('[data-cy="create-post-header-title"]').should('be.visible').and('have.text', 'Preview')
    cy.get('[data-cy="create-post-next-button"]').click()
    cy.get('[data-cy="create-post-header-title"]').should('be.visible').and('have.text', 'Add caption')
    cy.get('[data-cy="create-post-caption-input"]').type('this is a test caption')
    cy.get('[data-cy="create-post-publish-button"]').click()
  })

})
