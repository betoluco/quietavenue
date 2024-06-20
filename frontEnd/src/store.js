import { configureStore } from '@reduxjs/toolkit';

import estatesReducer from './estatesReducer';
import playerReducer from './playerReducer';

export const setupStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
        estates: estatesReducer,
        player: playerReducer
        },
        preloadedState
    });
};