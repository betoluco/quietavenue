describe('Properties entry point', function(){
    it('Request properties', function(){
        cy.visit('127.0.0.1:8080')
        cy.get('header').should('be.visible').should('have.class', 'Header')
        cy.get('a[class="Card"]').should('be.visible')
    })
    
    it('Go to property', function(){
        cy.get('a[class="Card"]').first().click()
        cy.get('div[class="Address"]').should('be.visible')
        cy.get('div[class="Video"]').should('be.visible')
    })
    
    it("Go back to properties", function(){
        cy.go('back')
        cy.get('a[class="Card"]').should('be.visible')
    })
})

describe('Property entry point', function(){
    it('Request property', function(){
        cy.visit('127.0.0.1:8080/property/1170_Foster_City_Blvd_206_Foster_City_California')
        cy.get('header').should('be.visible').should('have.class', 'Header')
        cy.get('div[class="Address"]').should('be.visible')
        cy.get('div[class="Video"]').should('be.visible')
    })
    
    it('Go to properties', function(){
        cy.get('h1[class="Header__name"]').click()
        cy.get('a[class="Card"]').should('be.visible')
    })
    
    it("Click property", function(){
        cy.get('a[class="Card"]').first().click()
        cy.get('div[class="Address"]').should('be.visible')
        cy.get('div[class="Video"]').should('be.visible')
    })
})

describe('Property not found entry point', function(){
    it('Request property', function(){
        cy.visit('127.0.0.1:8080/property/none_existing_addres', {failOnStatusCode: false})
        cy.get('header').should('be.visible').should('have.class', 'Header')
        cy.get('h1[class="NotFound"]').should('be.visible')
    })
    
    it('Go to properties', function(){
        cy.get('h1[class="Header__name"]').click()
        cy.get('a[class="Card"]').should('be.visible')
    })
    
    it("Click property", function(){
        cy.get('a[class="Card"]').first().click()
        cy.get('div[class="Address"]').should('be.visible')
        cy.get('div[class="Video"]').should('be.visible')
    })
})
    
describe('Not found entry point', function(){
    it('Request not found', function(){
        cy.visit('127.0.0.1:8080/random', {failOnStatusCode: false})
        cy.get('header').should('be.visible').should('have.class', 'Header')
        cy.get('h1[class="NotFound"]').should('be.visible')
    })
    
    it('Go to properties', function(){
        cy.get('h1[class="Header__name"]').click()
        cy.get('a[class="Card"]').should('be.visible')
    })
    
    it("Click property", function(){
        cy.get('a[class="Card"]').first().click()
        cy.get('div[class="Address"]').should('be.visible')
        cy.get('div[class="Video"]').should('be.visible')
    })
})