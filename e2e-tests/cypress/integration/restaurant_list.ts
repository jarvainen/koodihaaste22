describe('restaurant list', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should fetch by search term', () => {
        cy.intercept('/api/restaurants*').as('fetchRestaurants')
        cy.get('input[type=text]').clear().type('tampere').wait(300)
        cy.wait('@fetchRestaurants').its('request.url').should('include', '?city=tampere')
    })

    it('should list restaurants', () => {
        cy.get('input[type=text]').clear().type('helsinki').wait(300)
        cy.get('section').find('li').its('length').should('be.greaterThan', 0)
    })

    it('should not list restaurants', () => {
        cy.get('input[type=text]').clear().wait(300)
        cy.get('section').find('li').should('not.exist')
    })
})