describe('WorkFlow links', () =>{
    it('Clicking call to action button takes you to workFlow', () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.contains('Real state professional?')
        .should('be.visible').click();
        cy.contains('Schedule your free trial!').should('be.visible')
        cy.contains('see our FAQ').click()
        cy.contains('Frequently asked question').should('be.visible')
    });
});