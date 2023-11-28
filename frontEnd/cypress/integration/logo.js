describe('logo', () =>{
    beforeEach(() => {
        cy.visit('/');
    });

    it('Logo has link to home', () =>{
        cy.contains('Schedule your free trial').should('be.visible').click();
        cy.get('[data-cy=linkToHome]').should('be.visible').click()
        cy.location('pathname').should('eq', '/')
    });
    it('Logo contains name', () =>{
        cy.get('[data-cy=companyName]').contains('QuietAvenue');
    })
})