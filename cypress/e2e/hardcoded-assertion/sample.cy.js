/// <reference types="Cypress" />
const { hits } = require('../../fixtures/stories')

describe('Hardcoded assertion bad practice', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**',
      { fixture: 'stories' }
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')
  })

  it('searches', () => {
    cy.search('cypress.io')
    cy.wait('@getStories')

    cy.get('.table-row')
      .as('tableRow')
      .should('have.length', hits.length)
      
      hits.forEach((hit, index) => {
        cy.get('@tableRow')
          .eq(index)
          .should('contain', hit.title)
      })
  })
})
