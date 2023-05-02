describe('Code duplication bad practice - repetitive tests', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search**'
    ).as('getStories')

    cy.visit('https://hackernews-seven.vercel.app')
    cy.wait('@getStories')
  })

  const term = [
    'reactjs',
    'vuejs',
    'angularjs'
  ]

  term.forEach(term => {
    it(`searches for "${term}"`, () => {
      cy.search(term)
  
      cy.wait('@getStories')
  
      cy.get('.table-row')
        .should('have.length', 100)
    })
  })
})
