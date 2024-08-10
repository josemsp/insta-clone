const postComment = `test comment post added ${new Date().getTime()}`;
const selector_post_button = '[data-cy="create-post-button"]';
const selector_image_input = '[data-cy="select-image-input"]';
const selector_post_header_title = '[data-cy="create-post-header-title"]';
const selector_post_next_button = '[data-cy="create-post-next-button"]';
const selector_post_caption_input = '[data-cy="create-post-caption-input"]';
const selector_post_publish_button = '[data-cy="create-post-publish-button"]';
const selector_post_like_button = '[data-cy="like-button"]';
const selector_post_comment_input = '[data-cy="add-comment-input"]';
const selector_post = '[data-cy="post"]';

describe('Render dashboard page', () => {

  beforeEach(() => {
    cy.loginCache();
    cy.visit('/');
  });

  it('renders dashboard page', () => {
    cy.window().title().should('include', 'Insta Clone - Dashboard');
  });

  it('publish post', () => {
    cy.get(selector_post_button).click();
    cy.get('[data-cy="create-post-modal"]').should('be.visible');
    cy.get(selector_image_input).selectFile('cypress/fixtures/image-test.jpg', { force: true });
    cy.get(selector_post_header_title).should('be.visible').and('have.text', 'Preview');
    cy.get(selector_post_next_button).click();
    cy.get(selector_post_header_title).should('be.visible').and('have.text', 'Add caption');
    cy.get(selector_post_caption_input).type(postComment);
    cy.get(selector_post_publish_button).click();

    cy.get('[data-cy="create-post-modal"]').should('not.exist');
    cy.contains(postComment).should('be.visible').as('newPost');
  });

  it('like and unlike post', () => {
    cy.get(selector_post).first().within(() => {
      cy.get(selector_post_like_button).click();
    });

    cy.get(selector_post_like_button).should('have.class', 'fill-red-500 text-red-500');

    cy.get(selector_post).first().within(() => {
      cy.get(selector_post_like_button).click();
    });

    cy.get(selector_post_like_button).should('not.have.class', 'fill-red-500 text-red-500');

  });

  it('add comment', () => {
    const commentText = 'test comment added';

    cy.get(selector_post).first().within(() => {
      cy.get(selector_post_comment_input).type(commentText);
      cy.get(selector_post_comment_input).should('have.value', commentText);
      cy.get('[data-cy="add-comment-button"]').click();

      cy.get('[data-cy="show-all-comments-button"]').then($btn => {
        if ($btn.length > 0) {
          cy.wrap($btn).click();
        }
      });
    });

    cy.get(selector_post).get('[data-cy="comment"]').contains(commentText);

  });

  it('delete post', () => {
    cy.get(selector_post).first().within(() => {
      cy.get('[data-cy="post-options"]').click();
    });
    cy.get('[data-cy="modal-menu-options"]').should('be.visible');
    cy.get('[data-cy="delete-post-button"]').click();

    cy.get('[data-cy="timeline"]').contains(postComment).should('not.exist');
  });

});