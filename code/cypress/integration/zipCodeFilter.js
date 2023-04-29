describe('zipCodeFilter', () =>{
    it("filter page has filter indicator", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/?filter=zipCode&filterId=94404');
        cy.wait(['@apiCall'])
        cy.location('search').should('eq', '?filter=zipCode&filterId=94404')
        cy.get('[data-cy=filter]').should('exist')
        cy.get('[data-cy=filterName]').contains('Filter: 94404')
    });
    it("filter page has only filtered properties", () =>{
        cy.get('a[href*="/estate/2141-Mills-Ave-Menlo-Park-CA-94025"]').should('not.exist')
        cy.get('a[href*="/estate/1023-Flying-Fish-St-94404"]').should('exist')
        cy.get('a[href*="/estate/1020-Helm-Ln-Foster-City-Ca-94404"]').should('exist')
        cy.get('a[href*="/estate/All-suggester-start-equal"]').should('not.exist')
        cy.get('a[href*="/estate/622-Crane-Ave-Foster-City-CA-94404"]').should('exist')
    });
    it("clicking a filtered estate, takes you to the estate page", () =>{
        cy.get('a[href*="/estate/1020-Helm-Ln-Foster-City-Ca-94404"]').click()
        cy.location('pathname').should('eq', '/estate/1020-Helm-Ln-Foster-City-Ca-94404')
    });
    it("All estates shloud appear when deleting the filter", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/?filter=zipCode&filterId=94404');
        cy.wait(['@apiCall'])
        cy.location('search').should('eq', '?filter=zipCode&filterId=94404')
        cy.get('[data-cy=deleteFilter]').click()
        cy.get('a[href*="/estate/2141-Mills-Ave-Menlo-Park-CA-94025"]').should('exist')
        cy.get('a[href*="/estate/1023-Flying-Fish-St-94404"]').should('exist')
        cy.get('a[href*="/estate/1020-Helm-Ln-Foster-City-Ca-94404"]').should('exist')
        cy.get('a[href*="/estate/All-suggester-start-equal"]').should('exist')
        cy.get('a[href*="/estate/622-Crane-Ave-Foster-City-CA-94404"]').should('exist')
    });
});