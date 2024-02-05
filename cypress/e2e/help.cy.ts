describe('<HelpScreen />', () => {
  it('Goes to help screen when help button is clicked', () => {
    cy.visit('/');
    cy.getByDataCy('HelpButton').click();
    cy.getByDataCy('HelpScreen').should('exist');
  });
});
