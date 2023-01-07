describe('Estates cards', () =>{
    it("Estate cards renders all the properties", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=profilePicture]').should('exist')
        cy.get('[data-cy=street]').should('exist')
        cy.get('[data-cy=city]').should('exist')
    });
})