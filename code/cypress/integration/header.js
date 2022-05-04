describe('Menu', () =>{
    beforeEach(() => {
       cy.visit(''); 
       cy.get('[data-cy=hamburgerMenu]').should('not.exist')
       cy.get('[data-cy=openHamburgerMenu]').should('be.visible').click()
    });
    it('Menu opens and closes when clicking close', () =>{
       cy.get('[data-cy=hamburgerMenu]').should('be.visible')
       cy.get('[data-cy=closeHamburgerMenu]').should('be.visible').click()
       cy.get('[data-cy=hamburgerMenu]').should('not.exist')
    });
    // it('Menu opens and closes when clicking Home', () =>{
    //   cy.get('[data-cy=hamburgerMenu]').should('be.visible')
    //   cy.get('[data-cy=hamburgerMenuHome]').should('be.visible').click()
    //   cy.get('[data-cy=hamburgerMenu]').should('not.exist')
    // });
})