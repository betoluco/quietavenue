/**
 * @jest-environment jsdom
 */
import React, { Fragment } from 'react';
import 'regenerator-runtime/runtime' //required for redux when testing on SSR
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {render, screen, waitFor} from '@testing-library/react';
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
  
  render(
    <Provider store={store} >
      <MemoryRouter initialEntries={["/"]}>
        <Fragment>{renderRoutes(Routes)}</Fragment>
      </MemoryRouter>
    </Provider>
  );
  
  
  expect(await screen.findByRole("link", {name: "Estate address1 address2"})).toBeInDocument
  
});

test('invalid path should redirect to 404', () => {
  //Mock function used by google analytics
  window.gtag = function gtag(){};
  
  render(
      <MemoryRouter initialEntries={["/random"]}>
        <Fragment>{renderRoutes(Routes)}</Fragment>
      </MemoryRouter>
  );
  expect(screen.findByRole("heading", {name: "Ooops!, not found"})).toBeInDocument;
  
});