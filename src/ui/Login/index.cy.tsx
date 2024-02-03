import App from '../../App';
import { mgTexts } from '../../models/texts';
import { UiUserTokens } from '../../models/userTokens';
import { tokenKey, userKey } from '../../services/storage';
import TestAppProvider from '../../testUtils/TestAppProvider';
import { createAccessToken } from '../../testUtils/createAccessToken';

describe('<LoginScreen />', () => {
  it('Go to login screen and enter username/password', () => {
    cy.clock();
    cy.intercept('GET', '/api/progress', { statusCode: 200, body: [] }).as('login');
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <TestAppProvider override={{}}>
        <App />
      </TestAppProvider>,
    );
    cy.tick(100);
    cy.getByDataCy('loginScreen').should('exist');
    // Validate form
    cy.getByDataCy('LoginButton').click();
    cy.getByDataCy('username').type('user1');
    cy.getByDataCy('password').type('pass1');
    cy.getByDataCy('LoginError').should('not.exist');
    // Wrong credentials
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 400,
      body: { code: 'invalidCredentials' },
    });
    cy.getByDataCy('LoginButton').click();
    cy.getByDataCy('LoginError').should('have.text', mgTexts.errorInvalidCredentials);
    // Success
    const accessTk = createAccessToken(new Date());
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        user: { username: 'user1', id: 1 },
        tokens: { accessToken: accessTk, refreshToken: 'rt' },
      },
    });
    cy.getByDataCy('LoginButton').click();
    cy.getByDataCy('LoginError').should('not.exist');
    // Save data and go to home screen
    cy.getByDataCy('HomeScreen').should('exist');
    cy.getAllLocalStorage().then((storage) => {
      const current = storage[Object.keys(storage)[0]];
      expect(JSON.parse(current[userKey] as string)).to.deep.equal({ id: 1, username: 'user1' });
      expect(JSON.parse(current[tokenKey] as string)).to.deep.equal(
        new UiUserTokens({ accessToken: accessTk, refreshToken: 'rt' }),
      );
    });
  });
});
