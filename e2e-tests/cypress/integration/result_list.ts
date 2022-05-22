describe('result list', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should send vote', () => {
        cy.intercept('POST', '/api/vote*').as('vote')
        cy.get('section').find('li:first-child button').click()
        cy.wait('@vote').its('response.statusCode').should('eq', 200)
    })

    it('should remove vote', () => {
        cy.intercept('POST', '/api/vote*').as('vote')
        cy.get('section').find('li:first-child button').click()
        cy.wait('@vote').its('response.statusCode').should('eq', 200)
    })
})