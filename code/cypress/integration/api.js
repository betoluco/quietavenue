describe('API', () =>{
    it('API returns complete objects', () =>{
        cy.request('/api/estates').then(
            (response) => {
                expect(response.status).to.eq(200)
                expect(response.body[0].id).to.eq('2141-Mills-Ave-Menlo-Park-CA-94025')
            }
        )
        // cy.request('/api/estates').then((resp) => {
        //     expect(resp.status).to.eq(200)
        //     expect(resp.body).should('include', '{"id":"1023-Flying-Fish-St-94404","address1":"1023 Flying Fish St","address2":"Foster City, CA 94404","city":"Foster City CA","cityId":"Foster-City-CA","zipCode":"94404","citySuggest":["Foster City"],"zipCodeSuggest":["94404"],"estateSuggest":["1023","Flying Fish St"],"profilePicture":"https://d14gjrmy4gfvfp.cloudfront.net/assets/1023-Flying-Fish-St-94404/Front.jpg","audioDescription":"The noise and business outside of this home are lower than 90 percent of single-family homes","bathroom":2.5,"bedroom":3,"lotArea":2360,"soundScore":92,"price":2356000,"videoLink":"https://player.vimeo.com/video/421606419?badge=0&autopause=0&player_id=0&app_id=58479","graphData":[{"time":"2020-08-13T15:42:00","maxLoudness":"1.0","mp3Link":"assets/1023-Flying-Fish-St-94404/audioFiles/2020-08-13_15-42-00.mp3"},{"time":"2020-08-13T15:43:08","maxLoudness":"0.2630390331736198","mp3Link":"assets/1023-Flying-Fish-St-94404/audioFiles/2020-08-13_15-43-08.mp3"}')
        // });
    });
    // it('API blocks incomplete objects', () =>{
    //     cy.request('/api/estates').then((resp) => {
    //         expect(resp.status).to.eq(200)
    //         expect(resp.body).should('not.include', 'no-address1-estate')
    //     });
    // });
});

