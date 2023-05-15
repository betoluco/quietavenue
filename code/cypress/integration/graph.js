describe('estateTemplate', () =>{
    beforeEach(() => {
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('a[href*="/estate/1020-Helm-Ln-Foster-City-Ca-94404"]').click()
    });
    it("Graph display playing minute text when is playing", () =>{
        cy.get('[data-cy=playingMinuteText]').should('not.exist')
        cy.get('[data-cy=playButton]').should('exist').click({ multiple: true })
        cy.get('[data-cy=playingMinuteText]').should('exist')
        cy.get('[data-cy=playingMinuteText]').should('not.eq','0:00')
    });
    
    
});