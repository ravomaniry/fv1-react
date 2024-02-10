import { ProgressEntity } from '../../src/clients/fv1';
import { mgTexts } from '../../src/models/texts';

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
                    comment: 'SC211 comment',
                    audioId: '1',
                  },
                  {
                    subtitle: 'SC212 title',
                    comment: 'SC212 comment',
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
    // Open chapter manually
    cy.getByDataCy('TSChapter:1').click();
    cy.getByDataCy('ChapterTitle').should('have.text', 'TC12');
    // All chapters are completed
    // -> Continue goes to first chapter
    cy.go('back');
    cy.getByDataCy('ContinueButton').click();
    cy.getByDataCy('ChapterTitle').should('have.text', 'TC11');
    // Some chapters are not completed
    // -> Resume to the next chapter
    cy.visit('/');
    cy.getByDataCy('HomeTeachingTitle:2').click();
    cy.getByDataCy('ContinueButton').click();
    cy.getByDataCy('ChapterTitle').should('have.text', 'TC22');
    // Render content
    cy.getByDataCy('SectionTitle:0').should('have.text', 'SC211 title');
    cy.getByDataCy('SectionVerses:0').should('have.text', 'SC211 verses');
    cy.getByDataCy('SectionComment:0').should('have.text', 'SC211 comment');
    cy.getByDataCy('SectionTitle:1').should('have.text', 'SC212 title');
    cy.getByDataCy('SectionVerses:1').should('have.text', 'SC212 verses');
    cy.getByDataCy('SectionComment:1').should('have.text', 'SC212 comment');
    // Audio player
    cy.intercept('GET', '/api/audio/url/1', { body: { url: '/1-second-of-silence.mp3' }, statusCode: 200 });
    cy.getByDataCy('SectionTitle:0').click();
    cy.getByDataCy('AudioPlayer').should('exist').should('have.attr', 'autoplay');
    cy.getByDataCy('AudioPlayer').should('have.attr', 'src', '/1-second-of-silence.mp3');
    cy.getByDataCy('AppError').should('not.exist');
    // Audio player error
    cy.intercept('GET', '/api/audio/url/2', { body: { url: '/not-found.mp3' }, statusCode: 200 });
    cy.getByDataCy('SectionTitle:1').click();
    cy.getByDataCy('AudioPlayer').should('have.attr', 'src', '/not-found.mp3');
    cy.getByDataCy('AppError').should('have.text', mgTexts.errorAudioPlayer);
    cy.getByDataCy('DismissErrorButton').click();
    cy.getByDataCy('AppError').should('not.exist');
    // Quiz
    cy.getByDataCy('ContinueButton').click();
    cy.getByDataCy('AudioPlayer').should('not.exist');
    // Render questions
    cy.getByDataCy('QuizScreen').should('exist');
    cy.getByDataCy('Question:q1').should('have.text', '1. Q1?');
    cy.getByDataCy('Question:q2').should('have.text', '2. Q2?');
    cy.getByDataCy('Question:q3').should('have.text', '3. Q3?');
    // Fill form
    cy.getByDataCy('Option:q1:c1').click();
    // form validation
    cy.getByDataCy('ContinueButton').click();
    cy.getByDataCy('FieldError:q1').should('not.exist');
    cy.getByDataCy('FieldError:q2').should('exist');
    cy.getByDataCy('FieldError:q3').should('exist');
    // fill missing questions and submit
    cy.intercept('PUT', '/api/progress/save/20', { statusCode: 200, body: {} });
    cy.getByDataCy('Option:q2:c22').click();
    cy.getByDataCy('Option:q3:c3').click();
    cy.getByDataCy('ContinueButton').click();
    // Score screen
    cy.getByDataCy('ScoreScreen').should('exist');
    cy.getByDataCy('Score').should('have.text', `${mgTexts.score}: 1 / 3`);
    cy.getByDataCy('WrongAnswer:0').should('not.exist');
    cy.getByDataCy('WrongAnswer:1').should('exist').should('contain.text', '2. Q2?');
    cy.getByDataCy('GivenAnswer:1').should('exist').should('have.text', 'c22');
    cy.getByDataCy('CorrectAnswer:1').should('exist').should('have.text', 'c2');
    cy.getByDataCy('WrongAnswer:2').should('exist').should('contain.text', '3. Q3?');
    cy.getByDataCy('GivenAnswer:2').should('exist').should('have.text', 'c3');
    cy.getByDataCy('CorrectAnswer:2').should('exist').should('have.text', 'c33');
    // TODO: assert request body
    // Go to next chapter
    cy.getByDataCy('ContinueButton').click();
    // reset audio player state
    cy.getByDataCy('AudioPlayer').should('not.exist');
    cy.getByDataCy('ChapterTitle').should('have.text', 'TC23');
    cy.getByDataCy('SectionTitle:0').should('have.text', 'SC231 title');
    // Play audio
    cy.intercept('GET', '/api/audio/url/3', { body: { url: '/1-second-of-silence.mp3' }, statusCode: 200 });
    cy.getByDataCy('SectionTitle:0').click();
    cy.getByDataCy('AudioPlayer').should('have.attr', 'src', '/1-second-of-silence.mp3');
    // Go to quiz
    cy.getByDataCy('ContinueButton').click();
    // Fill and submit Quiz
    cy.getByDataCy('Option:a:x').click();
    cy.getByDataCy('ContinueButton').click();
    // Teaching is finished -> Continue goes to summary
    cy.getByDataCy('ContinueButton').click();
    cy.getByDataCy('TeachingSummaryScreen').should('exist');
    cy.getByDataCy('TSTitle').should('have.text', 'T2');
    // Update statistics
    cy.getByDataCy('DoneIcon:0').should('exist');
    cy.getByDataCy('DoneIcon:1').should('exist');
    cy.getByDataCy('DoneIcon:2').should('exist');
  });
});
