import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import { REQUEST } from '../../../types/createTweet';
import Api from './services';


export const deleteTweet = createAsyncThunk(
  "delete/Tweet", async (data: any) => {
    try {
      const response = await Api.deleteTweet(data);
      
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

export const deleteTweetSlice = createSlice({
  name: 'dtweet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(deleteTweet.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(deleteTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.response = action.payload;
    })
    .addCase(deleteTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = deleteTweetSlice.actions

export default deleteTweetSlice.reducer
