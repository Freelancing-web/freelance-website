import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: false,
  loading: false,
};
const userSlice = createSlice({
  name: "use",
  initialState: initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      console.log("hello ", action.payload.data);
      state.currentUser = action.payload;
      (state.loading = false), (state.error = null);
    },

    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updaetProfileSuccess: (state, action) => {
      state.currentUser.rest = action.payload;
      (state.loading = false), (state.error = null);
    },

    updateProfileFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInFailure, signInSuccess, signInStart, 
     signout, updateProfileFail,updateProfileStart,updaetProfileSuccess } =
  userSlice.actions;
export default userSlice.reducer;
