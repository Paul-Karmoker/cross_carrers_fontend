import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const BASE_URL = 'http://localhost:4001/api/v1/auth/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Withdrawals'],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
      onError: (error) => {
        console.error('Signup error:', error);
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
      onError: (error) => {
        console.error('Login error:', error);
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      transformResponse: () => {
        localStorage.removeItem('token');
        return { success: true };
      },
      invalidatesTags: ['Profile', 'Withdrawals'], // Invalidate Profile and Withdrawals
    }),

    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: 'forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmail: builder.query({
      query: (token) => `verify-email?token=${token}`,
    }),

    getprofile: builder.query({
        query: () => 'get-profile',
        providesTags: ['Withdrawals'],
    }),

    updateProfile: builder.mutation({
      query: (profile) => ({
        url: 'profile',
        method: 'PATCH',
        body: profile,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: 'change-password',
        method: 'PATCH',
        body: data,
      }),
    }),

    subscribe: builder.mutation({
      query: (data) => ({
        url: 'subscribe',
        method: 'POST',
        body: data,
      }),
    }),

    withdraw: builder.mutation({
      query: (data) => ({
        url: 'withdraw',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    getWithdrawals: builder.query({
      query: () => 'withdraw',
      providesTags: ['Withdrawals'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailQuery,
  useGetprofileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSubscribeMutation,
  useWithdrawMutation,
    useGetWithdrawalsQuery,
  useLogoutMutation
} = authApi;