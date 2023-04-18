import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from './services';

export const getMessages = createAsyncThunk(
  "get/messages", async (data: any) => {
    try {
      const response = await Api.getMessages(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  messagesData: [],
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const getMessagesSlice = createSlice({
  name: 'gnotes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMessages.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.messagesData = action.payload;
    })
    .addCase(getMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = getMessagesSlice.actions

export default getMessagesSlice.reducer
