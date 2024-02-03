import './commands';

type GetReturnType = ReturnType<typeof cy.get>;
type TypeOfGet = (id: string) => GetReturnType;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByDataCy: TypeOfGet;
    }
  }
}

Cypress.Commands.add('getByDataCy', (id: string) => cy.get(`[data-cy=${JSON.stringify(id)}]`) as GetReturnType);
