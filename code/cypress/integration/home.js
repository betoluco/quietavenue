describe('Home links', () =>{
    it('Clicking call to action button takes you to workFlow', () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.contains('Real state professional?')
        .should('be.visible').click();
        cy.contains('Schedule your free trial!').should('be.visible')
    });
})