import { mgTexts } from '../../src/models/texts';
import { newUiUserTokens } from '../../src/models/userTokens';
import { tokenKey, userKey } from '../../src/services/storage';
import { createAccessToken } from '../support/createAccessToken';

describe('Auth screen', () => {
  const accessTk = createAccessToken(new Date());

  beforeEach(() => {
    cy.clock();
    cy.intercept('GET', '/api/progress', { statusCode: 200, body: [] }).as('login');
    cy.intercept('GET', '/api/teaching/new', { statusCode: 200, body: [] }).as('login');
    cy.visit('/');
    cy.tick(100);
  });

  it('Log in with username and password - and logout', () => {
    cy.getByDataCy('LoginScreen').should('exist');
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
    cy.getByDataCy('HomeScreen')
      .should('exist')
      .then(() => {
        expect(JSON.parse(localStorage.getItem(userKey)!)).to.deep.equal({ id: 1, username: 'user1' });
        expect(JSON.parse(localStorage.getItem(tokenKey)!)).to.deep.equal(
          newUiUserTokens({ accessToken: accessTk, refreshToken: 'rt' }),
        );
      });
    // Log out: go to login screen and clear local storage
    cy.getByDataCy('UserMenuButton').click();
    cy.getByDataCy('LogoutButton').click();
    cy.getByDataCy('LoginScreen')
      .should('exist')
      .then(() => {
        expect(localStorage.getItem(userKey)).to.eq(null);
        expect(localStorage.getItem(tokenKey)).to.eq(null);
      });
  });

  it('Register with username/password', () => {
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 201,
      body: {
        user: { username: 'user2', id: 2 },
        tokens: { accessToken: accessTk, refreshToken: 'rt' },
      },
    });
    cy.getByDataCy('LoginScreen').should('exist');
    cy.getByDataCy('RegisterButton').click();
    cy.getByDataCy('RegisterScreen').should('exist');
    cy.getByDataCy('username').type('user2');
    cy.getByDataCy('password').type('pass1');
    cy.getByDataCy('LoginButton').click();
    cy.getByDataCy('HomeScreen')
      .should('exist')
      .then(() => {
        expect(JSON.parse(localStorage.getItem(userKey)!)).to.deep.equal({ id: 2, username: 'user2' });
        expect(JSON.parse(localStorage.getItem(tokenKey)!)).to.deep.equal(
          newUiUserTokens({ accessToken: accessTk, refreshToken: 'rt' }),
        );
      });
  });

  it('Register as guest', () => {
    cy.intercept('POST', '/api/auth/register-guest', {
      statusCode: 201,
      body: {
        user: { username: 'user3', id: 3 },
        tokens: { accessToken: accessTk, refreshToken: 'rt' },
      },
    });
    cy.getByDataCy('RegisterGuestButton').click();
    cy.getByDataCy('HomeScreen')
      .should('exist')
      .then(() => {
        expect(JSON.parse(localStorage.getItem(userKey)!)).to.deep.equal({ id: 3, username: 'user3' });
        expect(JSON.parse(localStorage.getItem(tokenKey)!)).to.deep.equal(
          newUiUserTokens({ accessToken: accessTk, refreshToken: 'rt' }),
        );
      });
  });
});
