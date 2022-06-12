import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: false,
    success: false,
  },
  reducers: {
    createUserInProgress: (state, action) => {
      state.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = false;
    },
    createUserError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    readUserInProgress: (state, action) => {
      state.loading = true;
    },
    readUserSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = false;
    },
    readUserError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  createUserInProgress,
  createUserSuccess,
  createUserError,
  readUserInProgress,
  readUserSuccess,
  readUserError,
} = authSlice.actions;
export default authSlice.reducer;
