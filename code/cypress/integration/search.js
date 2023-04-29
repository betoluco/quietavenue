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
    it("Browser goes to estate page when cliclking a estate in search results", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=inputField]').type("10");
        cy.get('[data-cy=resultsList]').find('a[href*="/estate/1020-Helm-Ln-Foster-City-Ca-94404"]').click()
        cy.location('pathname').should('eq', '/estate/1020-Helm-Ln-Foster-City-Ca-94404')
    });
    it('Clicking on 94404 zip code take you to "/?filter=zipCode&filterId=94404"', () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=inputField]').type("9");
        cy.get('a[href*="/?filter=zipCode&filterId=94404"]').should('be.visible').click()
        cy.location('search').should('eq', '?filter=zipCode&filterId=94404');
    });
    it('Clicking on 94404 zip code take you to "/?filter=zipCode&filterId=94404"', () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=inputField]').type("f");
        cy.get('a[href*="/?filter=cityId&filterId=Foster-City-CA"]').should('be.visible').click()
        cy.location('search').should('eq', '?filter=cityId&filterId=Foster-City-CA');
    });
});