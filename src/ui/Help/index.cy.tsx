import App from '../../App';
import TestAppProvider from '../../testUtils/TestAppProvider';

describe('<HelpScreen />', () => {
  it('renders', () => {
    cy.clock();
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <TestAppProvider value={{}}>
        <App />
      </TestAppProvider>,
    );
    cy.tick(100);
    cy.getByDataCy('helpButton').click();
    cy.getByDataCy('helpScreen').should('exist');
  });
});
