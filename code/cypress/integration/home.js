describe('Home links', () =>{
    it('Clicking "Hire US!" in menu takes you to "/workFlow"', () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=HireUSLink]').should('be.visible').click();
        cy.location('pathname').should('eq', '/workFlow');
    });
    it('Clicking "How it works?" in menu takes you to "/workFlow"', () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=HowItWorksLink]').should('be.visible').click();
        cy.location('pathname').should('eq', '/mission');
    });
})