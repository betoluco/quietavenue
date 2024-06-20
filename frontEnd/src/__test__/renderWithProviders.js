import {render} from "@testing-library/react";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom';

import { setupStore } from '../store'

const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store} >
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProviders;