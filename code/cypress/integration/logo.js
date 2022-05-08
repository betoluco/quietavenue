describe('logo', () =>{
    it('Logo has link to home', () =>{
        cy.visit('');
        cy.get('[data-cy=linkToHome]').should('be.visible').click()
        cy.location('pathname').should('eq', '/')
        
        
    });
    it('Logo contains name', () =>{
        cy.get('[data-cy=companyName]').contains('QuietAvenue');
    })
    
})