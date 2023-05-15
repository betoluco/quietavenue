describe('Menu', () =>{
    beforeEach(() => {
        cy.visit('/'); 
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
        cy.get('[data-cy=openHamburgerMenu]').should('be.visible').click();
    });
    
    it('Menu opens and closes', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=closeHamburgerMenu]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    });
    it('Menu closes when not clicking a link', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    });
    it('Menu closes and takes you to "home"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.contains('Home').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
        cy.contains('Buying a house is stressfull!').should('be.visible');
    });
    
    it('Menu closes and takes you to "Schedule your free trial!"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.contains('Schedule your free trial!').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
        cy.contains('Schedule your free trial!').should('be.visible');
    })
    
    it('Menu closes and takes you to "How it works?"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.contains('Contatc us').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
        cy.contains('Any matter related to this web site, please feel free to contact us').should('be.visible');
    })
})