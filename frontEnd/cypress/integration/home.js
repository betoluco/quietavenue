describe('Home links', () =>{
    beforeEach(() => {
        cy.visit('/');
    });

    it('Clicking call to action button takes you to workFlow', () =>{
        cy.contains('Real state professional?').should('be.visible').click();
        cy.contains('Schedule your free trial!').should('be.visible')
    });
    it('Clicking learn more link takes you to mission', () =>{
        cy.contains('lear more').should('be.visible').click();
        cy.contains('How it works?').should('be.visible')
    });
})