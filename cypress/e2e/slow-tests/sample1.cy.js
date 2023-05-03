/// <reference types="Cypress" />

describe('Slow tests bad practice - use the API to test the frontend', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**',
      { fixture: 'stories' }
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')
  })

  it('searches by typing and hitting enter', () => {
    cy.search('frontend testing')
    cy.wait('@getStories')
    
    cy.fixture("stories").then(({ hits }) => {
      cy.get('.table-row').should('have.length', hits.length)
    })
  })
})
