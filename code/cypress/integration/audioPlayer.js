describe('audioPlayer', () =>{
    it("Estate page has play button", () =>{
        cy.intercept('/api/estates*').as('apiCall')
        cy.visit('/');
        cy.wait(['@apiCall'])
        cy.get('a[href*="/estate/1020-Helm-Ln-Foster-City-Ca-94404"]').click()
        cy.get('[data-cy=playIcon]').should('exist')
    });
    it("The input value starts at cero", () =>{
        cy.get('[data-cy=seekbar]').invoke('val').should('eq','0')
    });
    it("icon changes to pause when clicking play button", () =>{
        cy.get('[data-cy=playButton]').should('exist').click({ multiple: true })
        cy.get('[data-cy=playIcon]').should('not.exist')
        cy.get('[data-cy=pauseIcon]').should('exist')
    });
    it("After a few seconds of playing the input value is different fron cero", () =>{
        cy.get('[data-cy=seekbar]').invoke('val').should('not.eq','0')
    });
    it("icon goes back to play when clicking play button", () =>{
        cy.get('[data-cy=playButton]').should('exist').click({ multiple: true })
        cy.get('[data-cy=pauseIcon]').should('not.exist')
        cy.get('[data-cy=playIcon]').should('exist')
    });
    it("Player time traker", () =>{
        cy.get('[data-cy=playButton]').should('exist').click({ multiple: true })
        cy.get('[data-cy=pauseIcon]').should('not.exist')
        cy.get('[data-cy=playIcon]').should('exist')
    });
    
});