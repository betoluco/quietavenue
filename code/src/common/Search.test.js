/**
* @jest-environment jsdom
*/
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

import Search from './Search';
import Header from './Header';

const server = setupServer(
  rest.get('https://quietavenue.com/api/search', (req, res, ctx) =>{
    console.log("request send")
    const search = req.url.searchParams.get('search');
    if (search === 'NoResults') {
      return res(ctx.json(
        [
        {"filter":"Properties","elements":[]},
        {"filter":"City","elements":[]},
        {"filter":"Zip Code","elements":[]}
      ]
      ));
    }
    return res(ctx.json(
      [
        {"filter":"Properties","elements":[
          {"link":"/estate/propertyLink","name":"TestPlace, CA 94404"}
        ]},
        {"filter":"City","elements":[
          {"link":"?filter=cityId&filterId=City-Id","name":"TestCity"}  
        ]},
        {"filter":"Zip Code","elements":[
          {"link":"?filter=zipCodeId&filterId=zipCode-Id","name":"TestZipCode"} 
        ]}
      ]
    ));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Search results disappear when input length is less than 2", async () =>{
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  
  const input = screen.getByRole("textbox", {name: "Search by zip code, city or address"});
  userEvent.type(input, '1');
  expect(screen.queryByRole("list", {name: ""})).not.toBeInDocument
  
  userEvent.type(input, '12');
  expect(screen.findByRole("listitem", {name: "Properties"})).not.toBeInDocument;
  expect(screen.findByRole("listitem", {name: "TestPlace, CA 94404"})).toBeInDocument;
  expect(screen.findByRole("listitem", {name: "City"})).toBeInDocument;
  expect(screen.findByRole("listitem", {name: "TestCity"})).toBeInDocument;
  expect(screen.findByRole("listitem", {name: "Zip Code"})).toBeInDocument;
  expect(screen.findByRole("listitem", {name: "TestZipCode"})).toBeInDocument;
  // await waitFor(() => userEvent.type(input, ''));
  // await waitFor(() => userEvent.type(screen.getByRole("textbox", {name: "Search by zip code, city or address"}), '1'));
  // {
  //   expect(component.queryByRole("list", {name: ""})).not.toBeInDocument
  // });
});

// // test("When no results are returned, a No result element is displayed", async () =>{
// //   const component = render(
// //     <MemoryRouter>
// //       <Search />
// //     </MemoryRouter>
// //   );
  
//   // const input = component.getByRole("textbox", {name: "Search by zip code, city or address"});
//   // userEvent.type(input, 'NoResults');
//   //await waitFor(() => component.getByText("No results").toBeInDocument);
  
// // });

// // test("On click input gets emptyed", async () =>{
// //   const component = render(
// //     <MemoryRouter>
// //       <Search />
// //     </MemoryRouter>
// //   );
  
// //   const input = component.getByRole("textbox", {name: "Search by zip code, city or address"});
// //   userEvent.type(input,'results');
// //   const result = await waitFor(() => component.getByText("TestPlace, CA 94404"));
// //   result.toBeInDocument;
// //   userEvent.click(result);
// //   expect(input.value).toBe('')
// // })

// // test("On blur input results disappear", async () =>{
// //   const component = render(
// //     <MemoryRouter>
// //       <Header />
// //     </MemoryRouter>
// //   );
  
// //   const input = component.getByRole("textbox", {name: "Search by zip code, city or address"});
// //   userEvent.type(input,'results');
// //   await waitFor(() => component.getByText("TestPlace, CA 94404").toBeInDocument);
// //   const headerSlogan = component.getByRole("heading", {
// //     name: "See and hear what goes on in front of your future home"
// //   });
// //   userEvent.click(headerSlogan);
  
// //   await waitFor(() =>{
// //     expect(component.queryByRole("list", {name: ""})).not.toBeInDocument
// //     expect(input.value).toBe('results')
// //   });
// //   userEvent.click(input);
// //   await waitFor(() => component.getByText("TestPlace, CA 94404").toBeInDocument);
// // })