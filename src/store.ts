/* eslint-disable @typescript-eslint/no-explicit-any */

import { configureStore, Middleware } from "@reduxjs/toolkit";
import { authApi } from "./redux/features/authApi";
import { resumeApi } from "./redux/features/resumeApi";
import { writtenTestApi } from "./redux/features/writtenTestApi";
import { paymentApi } from "@/redux/features/paymentApi";
import resumeReducer from "./redux/features/resumeSlice";

/* ─────────────────────────────
   Logger Middleware
───────────────────────────── */
const loggerMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (import.meta.env.DEV) {
      console.log("Dispatching action:", action);
      console.log("State before:", store.getState());
    }

    const result = next(action);

    if (import.meta.env.DEV) {
      console.log("State after:", store.getState());
    }

    return result;
  };

/* ─────────────────────────────
   Store Configuration
───────────────────────────── */
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer, // ✅ OK
    [writtenTestApi.reducerPath]: writtenTestApi.reducer,

    resume: resumeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "authApi/executeQuery/fulfilled",
          "authApi/executeMutation/fulfilled",
        ],
        ignoredPaths: [
          "authApi.queries",
          "authApi.mutations",
        ],
      },
    }).concat(
      authApi.middleware,
      resumeApi.middleware,
      paymentApi.middleware,      // ✅ 🔥 THIS WAS MISSING
      writtenTestApi.middleware,
      loggerMiddleware
    ),

  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
