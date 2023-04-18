import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import Api from './services';


export const getMyUserData = createAsyncThunk(
  "get/myUserData", async (data: {token: string}) => {
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

export const getMyUserSlice = createSlice({
  name: 'gmuser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMyUserData.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getMyUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .addCase(getMyUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = getMyUserSlice.actions

export default getMyUserSlice.reducer
