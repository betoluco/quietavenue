describe('audioPlayer', () =>{
    beforeEach(() => {
        cy.visit('/estate/1020-Helm-Ln-Foster-City-Ca-94404');
    });
    
    it("Audio player has the initial condition", () =>{
        cy.get('[data-cy=playIcon]').should('exist')
        cy.get('[data-cy=duration]').should('not.eq', '0:00')
        cy.get('[data-cy=seekbar]').invoke('val').should('eq','0')
    });
    
    it("Icon shifts from pause to play", () =>{
        cy.get('[data-cy=playIcon]').should('exist')
        cy.get('[data-cy=playButton]').should('exist').click({ multiple: true })
        cy.get('[data-cy=playIcon]').should('not.exist')
        cy.get('[data-cy=pauseIcon]').should('exist')
        cy.get('[data-cy=playButton]').should('exist').click({ multiple: true })
        cy.get('[data-cy=pauseIcon]').should('not.exist')
        cy.get('[data-cy=playIcon]').should('exist')
    });
    it("After a few seconds of playing the input value and progress counter are different fron cero", () =>{
        cy.get('[data-cy=playButton]').should('exist').click({ multiple: true })
        cy.get('[data-cy=seekbar]').invoke('val').should('not.eq','0')
        cy.get('[data-cy=progressTimer]').invoke('val').should('not.eq','0:00')
    });
});