/**
 * @jest-environment jsdom
 */
import React, { Fragment } from 'react';
import {render} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { renderRoutes } from "react-router-config";

import Routes from"./Routes";

test('Sanity check', () => {
  expect(1+1).toBe(2);
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