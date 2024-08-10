describe('Test env', () => {
  it('should have env variables', () => {
    expect(Cypress.env('VITE_APP_FIREBASE_API_KEY')).to.exist;
    expect(Cypress.env('VITE_APP_FIREBASE_API_AUTH_DOMAIN')).to.exist;
    expect(Cypress.env('VITE_APP_FIREBASE_API_PROJECT_ID')).to.exist;
    expect(Cypress.env('VITE_APP_FIREBASE_API_STORAGE_BUCKET')).to.exist;
    expect(Cypress.env('VITE_APP_FIREBASE_API_MESSAGING')).to.exist;
    expect(Cypress.env('VITE_APP_FIREBASE_API_APP_ID')).to.exist;
  });
});