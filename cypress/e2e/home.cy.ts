describe('Home screen', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.prePopulateLocalStorage();
  });

  it('No saved progress and no new teaching: Display button to go to explorer', () => {
    cy.intercept('GET', '/api/progress', { statusCode: 200, body: [] });
    cy.intercept('GET', '/api/teaching/new', { statusCode: 500, body: {} });
    cy.getByDataCy('HomeScreen').should('exist');
    cy.getByDataCy('EmptyScreen').should('exist');
  });

  it('Displays new teachings list when there is no progress', () => {
    cy.intercept('GET', '/api/progress', { statusCode: 200, body: [] });
    cy.intercept('GET', '/api/teaching/new', {
      statusCode: 200,
      body: [{ id: 1, title: 'Teaching 1', subtitle: 'Subtitle 1' }],
    });
    cy.getByDataCy('HomeScreen').should('exist');
    cy.getByDataCy('EmptyScreen').should('not.exist');
    cy.getByDataCy('NewTeaching:1').should('contain.text', 'Teaching 1').should('contain.text', 'Subtitle 1');
  });
});
