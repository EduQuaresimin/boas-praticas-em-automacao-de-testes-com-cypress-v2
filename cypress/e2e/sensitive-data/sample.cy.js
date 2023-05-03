describe('Sensitive data bad practice', () => {
  beforeEach(() => {
    cy.visit('https://notes-serverless-app.com/login')
  })

  it('fills the form leaking sensitive data', (
    user = Cypress.env('user_email'),
    password = Cypress.env('user_password')
  ) => {
    cy.get('#email').type(user)
    cy.get('#password').type(password, { log: false })
  })
})
