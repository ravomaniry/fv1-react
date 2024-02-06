import { NewTeachingRespDto, ProgressEntity } from '../../src/clients/fv1';

describe('ExplorerScreen', () => {
  beforeEach(() => {
    cy.visit('/explorer');
    cy.prePopulateLocalStorage();
  });

  it('No new teaching', () => {
    cy.intercept('GET', '/api/progress', { statusCode: 200, body: [] });
    cy.intercept('GET', '/api/teaching/new', { statusCode: 200, body: [] });
  });

  it('Open teaching from explorer', () => {
    cy.intercept('GET', '/api/progress', {
      statusCode: 200,
      body: <ProgressEntity[]>[
        {
          id: 1,
          clientTimestamp: 100,
          scores: [],
          teaching: {
            id: 1,
            title: 'T1',
            subtitle: 'ST1',
            chapters: [{ title: 'TC11', sections: [], questions: [] }],
          },
        },
      ],
    });
    cy.intercept('GET', '/api/teaching/new', {
      statusCode: 200,
      body: <NewTeachingRespDto[]>[{ id: 2, title: 'T2', subtitle: 'ST2' }],
    });
    cy.intercept('POST', '/api/progress/start', {
      statusCode: 200,
      body: <ProgressEntity>{
        id: 2,
        teaching: {
          id: 2,
          title: 'T2',
          subtitle: 'ST2',
          chapters: [{ title: 'CH2', sections: [], questions: [] }],
        },
        scores: [],
        clientTimestamp: 1,
      },
    });
    cy.getByDataCy('NewTeaching:2').click();
    cy.getByDataCy('TeachingSummaryScreen').should('exist');
    cy.getByDataCy('TSTitle').should('have.text', 'T2');
  });
});
