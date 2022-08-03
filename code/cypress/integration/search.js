describe('Search', () =>{
    it("Input display results", () =>{
        cy.visit('/');
        cy.get('[data-cy=inputField]').type("f");
        cy.get('[data-cy=resultsList]').should('be.visible')
    });
    it("Results list disappears when input blurs", () =>{
        cy.get('[data-cy=inputField]').blur()
        cy.get('[data-cy=resultsList]').should('not.exist')
    });
    it("Input text doesn't disappears when input blurs ", () =>{
        cy.get('[data-cy=inputField]').should('have.value', 'f')
    });
    it("Results list appears again on input focus", () =>{
        cy.get('[data-cy=inputField]').focus()
        cy.get('[data-cy=resultsList]').should('be.visible')
    });
    
    it("No results message is displayed when noting is found", () =>{
        cy.visit('/');
        cy.get('[data-cy=inputField]').type("no resulst");
        cy.get('[data-cy=resultsList]').should('be.visible')
        cy.get('[data-cy=noResults]').should('have.text', 'No results')
    });
     it("Estate, City, ZipCode titles are displayed", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=inputField]').type("10");
        cy.get('[data-cy=resultsList]').should('be.visible')
        cy.get('[data-cy=estateTitle]').should('have.text', 'Estates')
        cy.get('[data-cy=cityTitle]').should('have.text', 'City')
        cy.get('[data-cy=zipCodeTitle]').should('have.text', 'Zip code')
    });
    //it("Estate Page  when cliclking estate", () =>{
});
