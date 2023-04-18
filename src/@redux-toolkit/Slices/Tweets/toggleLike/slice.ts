import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { REQUEST } from '../../../types/toggleLoke';
import Api from './services';

export const addLike = createAsyncThunk(
  "toggle/like", async (data: REQUEST) => {
    try {
      const response = await Api.addLike(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  message: {},
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const toggleLikeSlice = createSlice({
  name: 'tlike',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addLike.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addLike.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload;
    })
    .addCase(addLike.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = toggleLikeSlice.actions

export default toggleLikeSlice.reducer
