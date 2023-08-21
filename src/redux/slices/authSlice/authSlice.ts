import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { RootState } from '../../store';
import {
  Status,
  IAuthState,
  IDataAxios,
  IDataGetUser,
  IFetchLoginArgs,
  IFetchRegisterArgs,
} from './types';

// async thunks---------------------------------
export const fetchRegister = createAsyncThunk<IDataAxios, IFetchRegisterArgs>(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await axios.post<IDataAxios>('/register', params);
    return data;
  }
);

export const fetchLogin = createAsyncThunk<IDataAxios, IFetchLoginArgs>(
  'auth/fetchLogin',
  async (params) => {
    const { data } = await axios.post<IDataAxios>('/login', params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk<IDataGetUser, number>(
  'auth/fetchAuthMe',
  async (id) => {
    const { data } = await axios.get<IDataGetUser>(`/users/${id}`);
    delete data.password;
    return data;
  }
);

//authSlice--------------------------------------
const initialState: IAuthState = {
  user: null,
  status: Status.SUCCESS,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(fetchRegister.pending, (state) => {
        state.status = Status.LOADING;
        state.user = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.user;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = Status.ERROR;
        state.user = null;
      })
      //login
      .addCase(fetchLogin.pending, (state) => {
        state.status = Status.LOADING;
        state.user = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.user;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = Status.ERROR;
        state.user = null;
      })
      //authMe
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = Status.LOADING;
        state.user = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = Status.ERROR;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuth = (state: RootState) => Boolean(state.auth.user);
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
