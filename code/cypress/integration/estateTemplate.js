describe('estateTemplate', () =>{
    it("Estate properties are rendered if exist", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('a[href*="/estate/1020-Helm-Ln-Foster-City-Ca-94404"]').click()
        cy.get('[data-cy=profilePicture]').should('exist')
        cy.get('[data-cy=address]').should('exist')
        cy.get('[data-cy=estatePrice]').should('exist')
        cy.get('[data-cy=estateBathroom]').should('exist')
        cy.get('[data-cy=estateBedroom]').should('exist')
        cy.get('[data-cy=estateLotArea]').should('exist')
        cy.get('[data-cy=estateVideo]').should('exist')
        cy.get('[data-cy=estateSoundScore]').should('exist')
        cy.get('[data-cy=estateAudioDescription]').should('exist')
        cy.get('[data-cy=estateAudioGraph]').should('exist')
    });
    it("Estate properties are not rendered if exist", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('a[href*="/estate/All-suggester-start-equal"]').click()
        cy.get('[data-cy=profilePicture]').should('exist')
        cy.get('[data-cy=address]').should('exist')
        cy.get('[data-cy=estatePrice]').should('not.exist')
        cy.get('[data-cy=estateBathroom]').should('not.exist')
        cy.get('[data-cy=estateBedroom]').should('not.exist')
        cy.get('[data-cy=estateLotArea]').should('not.exist')
        cy.get('[data-cy=estateVideo]').should('not.exist')
        cy.get('[data-cy=estateSoundScore]').should('not.exist')
        cy.get('[data-cy=estateAudioDescription]').should('not.exist')
        cy.get('[data-cy=estateAudioGraph]').should('not.exist')
    });
});