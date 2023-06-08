import completeEstate from '../fixtures/completeEstate.json'

describe('API', () =>{
    it('API returns complete objects', () =>{
        cy.request('/api/estates').then(
            (response) => {
                expect(response.status).to.eq(200)
                response.body.forEach((estate, index, estatesArray) =>{
                    if (estate.id === "1023-Flying-Fish-St-94404"){
                        expect(estatesArray[index]).to.deep.equal(completeEstate)
                    }
                });
                
            }
        );
    });
    it('API blocks incomplete objects', () =>{
        cy.request('/api/estates').then((response) => {
            expect(response.status).to.eq(200)
            response.body.forEach((estate, index, estatesArray) =>{
                if (estate.id === "1023-Flying-Fish-St-94404"){
                    expect(estatesArray[index].id).to.not.equal('profilePicture')
                }
            })    
        });
    });
});

