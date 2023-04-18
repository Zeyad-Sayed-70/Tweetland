import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import Api from './services';

export const updateTweet = createAsyncThunk(
  "update/Tweet", async (data: any) => {
    try {
      const response = await Api.updateTweet(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  response: {},
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const updateTweetSlice = createSlice({
  name: 'utweet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateTweet.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(updateTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.response = action.payload;
    })
    .addCase(updateTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = updateTweetSlice.actions

export default updateTweetSlice.reducer
