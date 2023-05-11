describe('Menu', () =>{
    beforeEach(() => {
        cy.visit('/'); 
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
        cy.get('[data-cy=openHamburgerMenu]').should('be.visible').click();
    });
    
    it('Menu opens and closes when clicking close', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=closeHamburgerMenu]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    });
    it('Menu opens an closes when not clicking a link', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    });
    it('Menu opens and closes when clicking "Home"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuHome]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    });
    
    it('Clicking "Home" in menu takes you to menu', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuHome]').should('be.visible').click();
        cy.location('pathname').should('eq', '/');
    });
    
    it('Menu opens and closes when clicking "Hire US!"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuHireUS]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    })
    
    it('Clicking "Hire US!" in menu takes you to "/workFlow"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuHireUS]').should('be.visible').click();
        cy.location('pathname').should('eq', '/workFlow');
    });
    
    it('Menu opens and closes when clicking "How it works?"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuHowItWorks]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    })
    
    it('Clicking "How it works?" in menu takes you to "/mission"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuHowItWorks]').should('be.visible').click();
        cy.location('pathname').should('eq', '/mission');
    });
    
    it('Menu opens and closes when clicking "Contact us"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuContatUs]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    })
    
    it('Clicking "Contact us" in menu takes you to "/contact"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuContatUs]').should('be.visible').click();
        cy.location('pathname').should('eq', '/contact');
    });
})