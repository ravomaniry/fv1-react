describe('Sample teaching', () => {
  beforeEach(() => {
    cy.clock();
    cy.intercept('GET', '/api/progress', { statusCode: 200, body: [] });
    cy.intercept('GET', '/api/teaching/new', { statusCode: 200, body: [] });
    cy.intercept('GET', '/api/teaching/sample', {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'T1',
          subtitle: 'ST1',
        },
        {
          id: 1,
          title: 'T2',
          subtitle: 'ST2',
        },
      ],
    });
    cy.visit('/');
    cy.tick(100);
  });

  it('Open sample teaching without logging in', () => {
    cy.tick(5000);
    cy.getByDataCy('SampleTeachings').should('exist');
  });
});
