describe('zipCodeFilter', () =>{

    it("Searching for a zip code takes you to the zip code filter", () =>{
        cy.visit('/');
        cy.get('[data-cy=inputField]').type("9");
        cy.contains('94404').should('be.visible').click()
        cy.get('[data-cy=filter]').should('exist')
        cy.get('[data-cy=filterName]').contains('Filter: 94404')
        cy.contains('a', '1023 Flying Fish St').should('exist')
        cy.contains('a', '1020 Helm Ln').should('exist')
        cy.contains('a', '622 Crane Ave').should('exist')
        cy.contains('a', '100 Flower St').should('not.exist')
        cy.contains('a', '2141 Mills Ave').should('not.exist')
        cy.location().should((loc) => {
            expect(loc.search).to.eq('?filter=zipCode&filterId=94404')
        })
    });
    it("clicking a filtered estate, takes you to the estate page", () =>{
        cy.visit('/?filter=zipCode&filterId=94404');
        cy.contains('a', '1020 Helm Ln').should('exist').click()
        cy.location('pathname').should('eq', '/estate/1020-Helm-Ln-Foster-City-Ca-94404')
    });
    it("All estates shloud appear when deleting the filter", () =>{
        cy.visit('/?filter=zipCode&filterId=94404');
        cy.location('search').should('eq', '?filter=zipCode&filterId=94404')
        cy.contains('a', '1023 Flying Fish St').should('exist')
        cy.contains('a', '1020 Helm Ln').should('exist')
        cy.contains('a', '622 Crane Ave').should('exist')
        cy.contains('a', '100 Flower St').should('not.exist')
        cy.contains('a', '2141 Mills Ave').should('not.exist')
        cy.get('[data-cy=deleteFilter]').click()
        cy.contains('a', '1023 Flying Fish St').should('exist')
        cy.contains('a', '1020 Helm Ln').should('exist')
        cy.contains('a', '622 Crane Ave').should('exist')
        cy.contains('a', '100 Flower St').should('exist')
        cy.contains('a', '2141 Mills Ave').should('exist')
    });
});