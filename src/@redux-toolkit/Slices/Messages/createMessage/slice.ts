import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from './services';

export const createMessage = createAsyncThunk(
  "create/message", async (data: any) => {
    try {
      const response = await Api.createMessage(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  message: [],
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const createMessageSlice = createSlice({
  name: 'gnotes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createMessage.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(createMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload;
    })
    .addCase(createMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = createMessageSlice.actions

export default createMessageSlice.reducer
