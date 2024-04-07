import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  error: null,
  loading: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    getProjectsSuccess: (state, action) => {
        state.error = null,
        state.projects = action.payload,
        state.loading = false;
    },
    getProjectsPending: (state) => {
      state.error = null, 
      state.loading = true;
    },
    getProjectsFail: (state, action) => {
      state.error = action.payload,
      state.loading = false;
    },
  },
});

export const fetchAllData = (state) => state;
export const {getProjectsFail,getProjectsPending,getProjectsSuccess} = projectSlice.actions;
export default projectSlice.reducer;
