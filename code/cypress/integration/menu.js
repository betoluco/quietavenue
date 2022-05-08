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
    
    it('Menu opens and closes when clicking "For Agents"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuForAgents]').should('be.visible').click();
        cy.get('[data-cy=hamburgerMenu]').should('not.exist');
    })
    
    it('Clicking "For Agents" in menu takes you to "/tria"', () =>{
        cy.get('[data-cy=hamburgerMenu]').should('be.visible');
        cy.get('[data-cy=hamburgerMenuForAgents]').should('be.visible').click();
        cy.location('pathname').should('eq', '/trial');
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