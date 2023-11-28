import axios from 'axios';
import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  estates: [],
  status: 'idle',
  error: null
};

export const fetchEstates = createAsyncThunk('estates/fetchEstates', async () =>{
    const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/estates`);
    return response.data;
});

export const estatesSlice = createSlice({
    name: 'estates',
    initialState,
    reducers:{},
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

export default estatesSlice.reducer;