describe('Search', () =>{
    beforeEach(() => {
        cy.visit('/');
    });

    it("Input display results", () =>{
        cy.get('[data-cy=inputField]').type("f");
        cy.get('[data-cy=resultsList]').should('be.visible')
    });
    it("Results list appears and disappears when input focus or blurs", () =>{
        cy.get('[data-cy=inputField]').type("9");
        cy.get('[data-cy=resultsList]').should('be.visible')
        cy.get('[data-cy=inputField]').blur()
        cy.get('[data-cy=resultsList]').should('not.exist')
        cy.get('[data-cy=inputField]').focus()
        cy.get('[data-cy=resultsList]').should('be.visible')
    });
    it("Input text doesn't disappears when input blurs ", () =>{
        cy.get('[data-cy=inputField]').type("9");
        cy.get('[data-cy=resultsList]').should('be.visible')
        cy.get('[data-cy=inputField]').blur()
        cy.get('[data-cy=inputField]').should('have.value', '9')
    });
    it("No results message is displayed when noting is found", () =>{
        cy.get('[data-cy=inputField]').type("no resulst");
        cy.get('[data-cy=resultsList]').should('be.visible')
        cy.get('[data-cy=noResults]').should('have.text', 'No results')
    });
     it("Estate, City, ZipCode titles are displayed", () =>{
        cy.get('[data-cy=inputField]').type("10");
        cy.get('[data-cy=resultsList]').should('be.visible')
        cy.get('[data-cy=estateTitle]').should('have.text', 'Estates')
        cy.get('[data-cy=cityTitle]').should('have.text', 'City')
        cy.get('[data-cy=zipCodeTitle]').should('have.text', 'Zip code')
    });
    it("Browser goes to estate page when cliclking a estate in search results", () =>{
        cy.get('[data-cy=inputField]').type("f");
        cy.get('[data-cy=resultsList]').contains('a', '1023 Fliying Fish ST Foster City CA').click()
        cy.get('[data-cy=address]').should('have.text', '1023 Fliying Fish ST Foster City CA')
        cy.location('pathname').should('eq', '/estate/1020-Helm-Ln-Foster-City-Ca-94404')
    });
});