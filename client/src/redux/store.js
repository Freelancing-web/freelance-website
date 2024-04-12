import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import projectSlice from "./project-slice";
import PostSlice from "./slices/Post-slice";
import profileSlice from "./slices/profile-slice";
import experienceSlice from "./slices/experience-slice";
import themeSlice from "./slices/theme-slice";

const rootReducer = combineReducers({
  user: userSlice,
  project: projectSlice,
  post: PostSlice,
  profile: profileSlice,
  exp:experienceSlice,
  theme:themeSlice
});
const persistConfig = {
  key: "root2",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
