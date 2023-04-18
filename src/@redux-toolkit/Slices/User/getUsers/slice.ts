import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from './services';


export const getUsers = createAsyncThunk(
  "get/users", async (token: string) => {
    try {
      const response = await Api.getUsers(token);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

const initialState: any = {
  users: [],
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const getUsersSlice = createSlice({
  name: 'gusers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.users = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }) 
  }
})

export const {  } = getUsersSlice.actions

export default getUsersSlice.reducer
