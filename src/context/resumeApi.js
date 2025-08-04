// src/features/resume/resumeApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4001/api/v1/resume';

export const resumeApi = createApi({
  reducerPath: 'resumeApi',
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
  endpoints: (builder) => ({
    createResume: builder.mutation({
      query: (data) => ({
        url: 'resume',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateResumeMutation } = resumeApi;