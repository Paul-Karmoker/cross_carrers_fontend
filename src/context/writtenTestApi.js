// context/writtenTestApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.crosscareers.com/api/v1/writtenTest";

export const writtenTestApi = createApi({
  reducerPath: "writtenTestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["WrittenTest"],
  endpoints: (builder) => ({
    initSession: builder.mutation({
      query: (data) => ({
        url: "/init",
        method: "POST",
        body: data,
      }),
    }),
    startSession: builder.mutation({
      query: (sessionId) => ({
        url: `/start/${sessionId}`,
        method: "POST",
      }),
    }),
    getCurrent: builder.query({
      query: (sessionId) => `/current/${sessionId}`,
    }),
    submitAnswer: builder.mutation({
      query: (data) => ({
        url: "/answer",
        method: "POST",
        body: data,
      }),
    }),
    getResult: builder.query({
      query: (sessionId) => `/result/${sessionId}`,
    }),
    getTimeLeft: builder.query({
      query: (sessionId) => `/time/${sessionId}`,
    }),

    // IMPORTANT: PDF Download Endpoint
    downloadPdf: builder.query({
      query: (sessionId) => ({
        url: `/result/${sessionId}/pdf`,
        method: "GET",
        headers: { Accept: "application/pdf" },
        // Important for file downloads
        responseHandler: (response) => response.blob(), 
      }),
      // CRITICAL: Do not cache the Blob in Redux store, or it will throw serialization errors
      keepUnusedDataFor: 0, 
    }),
  }),
});

export const {
  useInitSessionMutation,
  useStartSessionMutation,
  useGetCurrentQuery,
  useSubmitAnswerMutation,
  useGetResultQuery,
  useGetTimeLeftQuery,
  useLazyDownloadPdfQuery,
} = writtenTestApi;