/// <reference types="cypress" />

import { newUiUserTokens } from '../../src/models/userTokens';
import { tokenKey, userKey } from '../../src/services/storage';
import { createAccessToken } from './createAccessToken';

type GetReturnType = ReturnType<typeof cy.get>;
type TypeOfGet = (id: string) => GetReturnType;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByDataCy: TypeOfGet;
      prePopulateLocalStorage: () => void;
    }
  }
}

Cypress.Commands.add('getByDataCy', (id: string) => cy.get(`[data-cy=${JSON.stringify(id)}]`) as GetReturnType);

Cypress.Commands.add('prePopulateLocalStorage', () => {
  localStorage.setItem(userKey, JSON.stringify({ id: 1, username: 'user1' }));
  localStorage.setItem(
    tokenKey,
    JSON.stringify(newUiUserTokens({ accessToken: createAccessToken(), refreshToken: 'rt1' })),
  );
});

export {};
