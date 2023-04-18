import { createSlice, createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit'
import { REQUEST_DATA } from '../../../common/Authentication/components/login';
import Api from './services';

export const createAccount = createAsyncThunk(
  "register", async (data: any, thunkApi) => {
    try {
      const response = await Api.register(data);
      
      return response.data;
    } catch (thunkApi: any) {
      return thunkApi.response.data
    }
})

export const login = createAsyncThunk(
  "login", async (data: REQUEST_DATA, { rejectWithValue }) => {    
    try {
      const response = await Api.login(data);
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
})

const initialState: any = {
  userData: {},
  errorData: {},
  isLoading: false,
  isSuccess: false,
  isError: false
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createAccount.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(createAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.userData = action.payload;
    })
    .addCase(createAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    }).addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.userData = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorData = action.payload;
    })
  }
})

export const {  } = AuthSlice.actions

export default AuthSlice.reducer
