import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import { REQUEST } from '../../../types/createTweet';
import Api from './services';


export const createTweet = createAsyncThunk(
  "create/Tweet", async (data: any) => {
    try {
      const response = await Api.createTweet(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  tweet: {},
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const createTweetSlice = createSlice({
  name: 'ctweet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createTweet.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(createTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.tweet = action.payload;
    })
    .addCase(createTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = createTweetSlice.actions

export default createTweetSlice.reducer
