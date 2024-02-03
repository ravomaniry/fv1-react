import { mgTexts } from '../../src/models/texts';
import { UiUserTokens } from '../../src/models/userTokens';
import { tokenKey, userKey } from '../../src/services/storage';
import { createAccessToken } from '../support/createAccessToken';

describe('template spec', () => {
  const accessTk = createAccessToken(new Date());

  beforeEach(() => {
    cy.clock();
    cy.intercept('GET', '/api/progress', { statusCode: 200, body: [] }).as('login');
    cy.visit('/');
    cy.tick(100);
  });

  it('Log in with username and password', () => {
    cy.getByDataCy('loginScreen').should('exist');
    // // Validate form
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

  it('Creates new account', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: {
        user: { username: 'user2', id: 2 },
        tokens: { accessToken: accessTk, refreshToken: 'rt' },
      },
    });
    cy.getByDataCy('loginScreen').should('exist');
    cy.getByDataCy('RegisterButton').click();
    cy.getByDataCy('RegisterScreen').should('exist');
    cy.getByDataCy('username').type('user2');
    cy.getByDataCy('password').type('pass1');
    cy.getByDataCy('LoginButton').click();
    cy.getByDataCy('HomeScreen').should('exist');
    cy.getAllLocalStorage().then((storage) => {
      const current = storage[Object.keys(storage)[0]];
      expect(JSON.parse(current[userKey] as string)).to.deep.equal({ id: 2, username: 'user2' });
      expect(JSON.parse(current[tokenKey] as string)).to.deep.equal(
        new UiUserTokens({ accessToken: accessTk, refreshToken: 'rt' }),
      );
    });
  });

  it('Log in as guest', () => {
    cy.intercept('POST', '/api/auth/register-guest', {
      statusCode: 201,
      body: {
        user: { username: 'user3', id: 3 },
        tokens: { accessToken: accessTk, refreshToken: 'rt' },
      },
    });
    cy.getByDataCy('RegisterGuestButton').click();
    cy.getByDataCy('HomeScreen').should('exist');
    cy.getAllLocalStorage().then((storage) => {
      const current = storage[Object.keys(storage)[0]];
      expect(JSON.parse(current[userKey] as string)).to.deep.equal({ id: 3, username: 'user3' });
      expect(JSON.parse(current[tokenKey] as string)).to.deep.equal(
        new UiUserTokens({ accessToken: accessTk, refreshToken: 'rt' }),
      );
    });
  });
});
