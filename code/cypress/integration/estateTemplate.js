describe('estateTemplate', () =>{
    it("Estate has a link to real state page", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=2141-Mills-Ave-Menlo-Park-CA-94025]').click()
        cy.get('[data-cy=linkToRealEstatePage]').invoke('attr', 'href').should('contain', 'https://')
        
    });
    it("Estate properties are rendered if exist", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('[data-cy=1023-Flying-Fish-St-94404]').click()
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
        cy.get('[data-cy=All-suggester-start-equal]').click()
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