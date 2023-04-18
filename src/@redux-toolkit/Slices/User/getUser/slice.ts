import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import Api from './services';


export const getUser = createAsyncThunk(
  "get/user", async (data: {token: string, tagName: string}) => {
    try {
      const response = await Api.getUser(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  user: {},
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const getUserSlice = createSlice({
  name: 'guser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = getUserSlice.actions

export default getUserSlice.reducer
