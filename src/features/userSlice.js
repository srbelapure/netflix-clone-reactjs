import { createSlice } from "@reduxjs/toolkit";

//userSLice is a user Reducer
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    //login and logout are actions
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

//selectors -> to get info from user store to our components we use selectors
//selectUser is a selector, it goes into store and gets user slice details
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
