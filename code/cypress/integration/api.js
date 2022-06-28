describe('API', () =>{
    it('API returns complete objects', () =>{
        cy.request('/api/estates').then(
            (response) => {
                expect(response.status).to.eq(200)
                expect(response.body[1].id).to.eq('1023-Flying-Fish-St-94404')
                expect(response.body[1].address1).to.eq('1023 Flying Fish St')
                expect(response.body[1].address2).to.eq('Foster City, CA 94404')
                expect(response.body[1].audioDescription).to.eq('The noise and business outside of this home are lower than 90 percent of single-family homes')
                expect(response.body[1].bathroom).to.eq(2.5)
                expect(response.body[1].bedroom).to.eq(3)
                expect(response.body[1].city).to.eq('Foster City CA')
                expect(response.body[1].citySuggest[0]).to.eq('Foster City')
                expect(response.body[1].estateSuggest[0]).to.eq('1023')
                expect(response.body[1].estateSuggest[1]).to.eq('Flying Fish St')
                expect(response.body[1].lotArea).to.eq(2360)
                expect(response.body[1].price).to.eq(2356000)
                expect(response.body[1].profilePicture).to.eq('assets/1023-Flying-Fish-St-94404/Front.jpg')
                expect(response.body[1].soundScore).to.eq(92)
                expect(response.body[1].videoLink).to.eq('https://player.vimeo.com/video/421606419?badge=0&autopause=0&player_id=0&app_id=58479')
                expect(response.body[1].zipCode).to.eq('94404')
                expect(response.body[1].zipCodeSuggest[0]).to.eq('94404')
                expect(response.body[1].graphData[0].time).to.eq('2020-08-13T15:42:00')
                expect(response.body[1].graphData[0].maxLoudness).to.eq('1.0')
                expect(response.body[1].graphData[0].mp3Link).to.eq('assets/1023-Flying-Fish-St-94404/audioFiles/2020-08-13_15-42-00.mp3')
            }
        )
    });
    // it('API blocks incomplete objects', () =>{
    //     cy.request('/api/estates').then((resp) => {
    //         expect(resp.status).to.eq(200)
    //         expect(resp.body).should('not.include', 'no-address1-estate')
    //     });
    // });
});

