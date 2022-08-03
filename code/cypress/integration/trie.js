describe('trie', () =>{
    it("Results are displayed", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=inputField]').type("10");
        cy.get('[data-cy=resultsList]').should('be.visible')
        cy.get('[data-cy=estateTitle]').should('have.text', 'Estates')
        cy.get(`[data-cy=${CSS.escape('estate/1020-Helm-Ln-Foster-City-Ca-94404')}]`).should('have.text', '1020 Helm Ln Foster City, CA 94404')
        //cy.get('[data-cy=estateTitle]').should('have.text', 'Estates')
    });
});