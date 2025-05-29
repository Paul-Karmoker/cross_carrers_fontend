import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../src/context/authApi';

// Optional: Add a logger middleware for debugging in development
const loggerMiddleware = (store) => (next) => (action) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    console.log('Dispatching action:', action);
    console.log('State before:', store.getState());
  }
  const result = next(action);
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    console.log('State after:', store.getState());
  }
  return result;
};

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in RTK Query actions
        ignoredActions: ['authApi/executeQuery/fulfilled', 'authApi/executeMutation/fulfilled'],
        ignoredPaths: ['authApi.queries', 'authApi.mutations'],
      },
    }).concat(authApi.middleware, loggerMiddleware),
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});