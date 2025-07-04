import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import playerReducer from "./slices/playerSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    users: userReducer,
    players: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
