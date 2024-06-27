import { configureStore } from '@reduxjs/toolkit';

import estatesReducer from './estatesReducer';

export const setupStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
        estates: estatesReducer,
        },
        preloadedState
    });
};