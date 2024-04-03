import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentTrack: 0,
  elapsedTime: 0,
  isPlaying: false
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
      currentTrackChanged(state, action){
        state.currentTrack = action.payload;
      },
      elapsedTimeUpdated(state, action){
        state.elapsedTime = action.payload;
      },
      playingStateChanged(state, action){
        state.isPlaying = action.payload;
      }
    }
});

export const {currentTrackChanged, elapsedTimeUpdated, playingStateChanged} = playerSlice.actions;

export default playerSlice.reducer;