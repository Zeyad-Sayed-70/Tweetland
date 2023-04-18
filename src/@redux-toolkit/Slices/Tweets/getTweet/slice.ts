import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import Api from './services';

export const getTweets = createAsyncThunk(
  "get/Tweets", async (data: { token: string, SKIP: number }) => {
    try {
      const response = await Api.getTweets(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

export const getTweet = createAsyncThunk(
  "get/Tweet", async (data: { id: string, token: string , SKIP: number}) => {
    try {
      const response = await Api.getTweet(data);

      return response.data.tweets;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  tweets: [],
  myTweets: [],
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const getTweetsSlice = createSlice({
  name: 'gtweet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTweets.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getTweets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.tweets = action.payload;
    })
    .addCase(getTweets.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    })
    .addCase(getTweet.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getTweet.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.myTweets = action.payload;
    })
    .addCase(getTweet.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    })
  }
})

export const {  } = getTweetsSlice.actions

export default getTweetsSlice.reducer
