import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from './services';

export const getNotifications = createAsyncThunk(
  "get/notification", async (data: any) => {
    try {
      const response = await Api.getNotifications(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  notes: [],
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const getNotificationsSlice = createSlice({
  name: 'gnotes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.notes = action.payload;
    })
    .addCase(getNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = getNotificationsSlice.actions

export default getNotificationsSlice.reducer
