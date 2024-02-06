import { NewTeachingRespDto, ProgressEntity } from '../../src/clients/fv1';

describe('Home screen', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.prePopulateLocalStorage();
  });

  it('No saved progress and no new teaching: display button to go to explorer', () => {
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
    cy.getByDataCy('ExplorerButton').should('exist');
  });

  it('Open teaching from progress', () => {
    cy.intercept('GET', '/api/teaching/new', { statusCode: 200, body: [] });
    cy.intercept('GET', '/api/progress', {
      statusCode: 200,
      body: <ProgressEntity[]>[
        {
          id: 1,
          clientTimestamp: 100,
          scores: [{ correctAnswersPercentage: 0.8 }, { correctAnswersPercentage: 0.1 }],
          teaching: {
            id: 1,
            title: 'T1',
            subtitle: 'ST1',
            chapters: [
              { title: 'TC11', sections: [], questions: [] },
              { title: 'TC12', sections: [], questions: [] },
            ],
          },
        },
        {
          id: 20,
          clientTimestamp: 1000,
          teaching: {
            id: 2,
            title: 'T2',
            subtitle: 'ST2',
            chapters: [{ title: 'TC2', sections: [], questions: [] }],
          },
          scores: [],
        },
      ],
    });
    // Render buttons
    cy.getByDataCy('ExplorerButton').should('exist');
    // Render teachings
    cy.getByDataCy('HomeTeachingTitle:1').should('have.text', 'T1');
    cy.getByDataCy('HomeTeachingSubtitle:1').should('have.text', 'ST1');
    cy.getByDataCy('HomeTeachingTitle:2').should('have.text', 'T2');
    cy.getByDataCy('HomeTeachingSubtitle:2').should('have.text', 'ST2');
    // Progress
    cy.getByDataCy('HomeScreenProgress:1').should('exist'); // 0.5
    cy.getByDataCy('HomeScreenProgress:2').should('exist'); // 0
    // Teaching summary 1
    cy.getByDataCy('HomeTeachingTitle:1').click();
    cy.getByDataCy('TeachingSummaryScreen').should('exist');
    cy.getByDataCy('TSTitle').should('have.text', 'T1');
    cy.getByDataCy('TSSubtitle').should('have.text', 'ST1');
    cy.getByDataCy('TSChapter:0').should('have.text', 'TC11');
    cy.getByDataCy('TSChapter:1').should('have.text', 'TC12');
    // Back to home and open teaching 2
    cy.go('back');
    cy.getByDataCy('HomeTeachingTitle:2').click();
    cy.getByDataCy('TSTitle').should('have.text', 'T2');
    cy.getByDataCy('TSSubtitle').should('have.text', 'ST2');
  });

  it('Open teaching from available list on home', () => {
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
