describe('logo', () =>{
    it('Logo has link', () =>{
        cy.visit('');
        cy.get('[data-cy=linkToHome]').should('have.attr', 'href','/');
        
        
    });
    it('Logo contains name', () =>{
        cy.get('[data-cy=companyName]').contains('QuietAvenue');
    })
    
})