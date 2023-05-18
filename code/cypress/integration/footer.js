describe('Footer', () =>{
   
    it('Footer link takes you to "home"', () =>{
        cy.visit('/')
        cy.contains('Home').should('be.visible').click();
        cy.contains('Buying a house is stressfull!').should('be.visible');
    });
    
    it('Footer link takes you to "Schedule your free trial!"', () =>{
        cy.contains('Schedule your free trial').should('be.visible').click();
        cy.contains('Schedule your free trial!').should('be.visible');
    })
    
    it('Footer link takes you to "How it works?"', () =>{
        cy.contains('How it works?').should('be.visible').click();
        cy.contains('How it works?').should('be.visible');
    })
    
    it('Footer link takes you to "FAQ"', () =>{
        cy.contains('FAQ').should('be.visible').click();
        cy.contains('Frequently asked questions').should('be.visible');
    })
    
    it('Footer link takes you to "Contact us"', () =>{
        cy.contains('Contact us').should('be.visible').click();
        cy.contains('Any matter related to this web site, please feel free to contact us').should('be.visible');
    })
    
})