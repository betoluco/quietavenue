import axios from 'axios';
import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  estates: [],
  status: 'idle',
  error: null,
  currentTrack: 0,
  elapsedTime: 0,
};

export const fetchEstates = createAsyncThunk('estates/fetchEstates', async () =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}/api/estates`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    return;
});

export const estatesSlice = createSlice({
    name: 'estates',
    initialState,
    reducers: {
      currentTrackChanged(state, action){
        state.currentTrack = action.payload;
      },
      elapsedTimeUpdated(state, action){
        state.elapsedTime = action.payload;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchEstates.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchEstates.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Add any fetched posts to the array
          state.estates = [...action.payload];
        })
        .addCase(fetchEstates.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }
});

export const {currentTrackChanged, elapsedTimeUpdated} = estatesSlice.actions;

export default estatesSlice.reducer;