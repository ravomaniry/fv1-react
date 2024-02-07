import { ProgressEntity } from '../../src/clients/fv1';

describe('ChapterScreen', () => {
  beforeEach(() => {
    cy.prePopulateLocalStorage();
    cy.intercept('GET', '/api/teaching/new', { statusCode: 200, body: [] });
    cy.intercept('GET', '/api/progress', {
      statusCode: 200,
      body: <ProgressEntity[]>[
        {
          id: 10,
          clientTimestamp: 0,
          teaching: {
            id: 1,
            title: 'T1',
            subtitle: 'ST1',
            chapters: [
              { title: 'TC11', sections: [], questions: [] },
              { title: 'TC12', sections: [], questions: [] },
            ],
          },
          scores: [{ correctAnswersPercentage: 1 }, { correctAnswersPercentage: 1 }],
        },
        {
          id: 20,
          clientTimestamp: 0,
          teaching: {
            id: 2,
            title: 'T2',
            subtitle: 'ST2',
            chapters: [
              { title: 'TC21', sections: [], questions: [] },
              {
                title: 'TC22',
                sections: [
                  {
                    subtitle: 'SC211 title',
                    verses: 'SC211 verses',
                    comment: 'SC211 content',
                    audioId: '1',
                  },
                  {
                    subtitle: 'SC212 title',
                    comment: 'SC212 content',
                    verses: 'SC212 verses',
                    audioId: '2',
                  },
                ],
                questions: [
                  { key: 'q1', question: 'Q1?', options: ['c1', 'c11'], responseIndex: 0 },
                  { key: 'q2', question: 'Q2?', options: ['c2', 'c22'], responseIndex: 0 },
                  { key: 'q3', question: 'Q3?', options: ['c3', 'c33'], responseIndex: 1 },
                ],
              },
              {
                title: 'TC23',
                sections: [
                  {
                    subtitle: 'SC231 title',
                    verses: 'SC231 verses',
                    comment: 'SC231 content',
                    audioId: '3',
                  },
                ],
                questions: [{ key: 'a', question: 'A?', options: ['x', 'y'], responseIndex: 0 }],
              },
            ],
          },
          scores: [{ correctAnswersPercentage: 0.8 }, { correctAnswersPercentage: 0.1 }],
        },
      ],
    });
  });

  it('From teaching summary - open a chapter and complete Quiz', async () => {
    cy.visit('/teaching/1');
    cy.getByDataCy('TSTitle').should('have.text', 'T1');
    cy.getByDataCy('TSChapter:1').click();
  });
});
