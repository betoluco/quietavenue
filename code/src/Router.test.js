/**
 * @jest-environment jsdom
 */
import React, { Fragment } from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {render, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import Routes from"./Routes";
import estatesReducer from './estatesReducer';

const server = setupServer(
  rest.get('https://quietavenue.com/api/estates', (req, res, ctx) =>{
    return res(ctx.json(
      [{
        id:"estate_id",
        address1:"address1",
        address2:"address2",
        profilePicture:"https://quietavenue.com/assets/id/front.jpg"
      }]
    ));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('home render estates', async () => {
  //Mock function used by google analytics
  window.gtag = function gtag(){};
  
  const store = configureStore({
    reducer:{
        estates: estatesReducer
    }
  });
  
  const component = render(
    <Provider store={store} >
      <MemoryRouter initialEntries={["/"]}>
        <Fragment>{renderRoutes(Routes)}</Fragment>
      </MemoryRouter>
    </Provider>
  );
  
  await waitFor(() => expect(component.getByRole("link", {name: "Estate address1 address2"}))
  .toHaveProperty("href", "http://localhost/estate/estate_id"));
  
  
});

test('invalid path should redirect to 404', () => {
  //Mock function used by google analytics
  window.gtag = function gtag(){};
  
  const component = render(
      <MemoryRouter initialEntries={["/random"]}>
        <Fragment>{renderRoutes(Routes)}</Fragment>
      </MemoryRouter>
  );
  component.getByRole("heading", {name: "Ooops!, not found"});
  
});