describe('Mission', () =>{
        beforeEach(() => {
            cy.visit('/');
        });

        it('Clicking learn more link takes you to mission', () =>{
                cy.contains('lear more')
                .should('be.visible').click();
                cy.contains('How it works?').should('be.visible')
                cy.contains('see our FAQ').click()
                cy.contains('Frequently asked question').should('be.visible')
        });
});