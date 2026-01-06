import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/* ─────────────────────────────
   Types (Minimal – no logic change)
───────────────────────────── */
type SessionId = string;

type InitSessionPayload = Record<string, any>;
type SubmitAnswerPayload = Record<string, any>;

type WrittenTestSession = Record<string, any>;
type WrittenTestResult = Record<string, any>;

/* ─────────────────────────────
   API CONFIG
───────────────────────────── */
const BASE_URL = 'https://api.crosscareers.com/api/v1/writtenTest';

export const writtenTestApi = createApi({
  reducerPath: 'writtenTestApi',

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

  tagTypes: ['WrittenTest'],

  endpoints: (builder) => ({
    /* ───────────── Session Lifecycle ───────────── */

    initSession: builder.mutation<WrittenTestSession, InitSessionPayload>({
      query: (data) => ({
        url: '/init',
        method: 'POST',
        body: data,
      }),
    }),

    startSession: builder.mutation<WrittenTestSession, SessionId>({
      query: (sessionId) => ({
        url: `/start/${sessionId}`,
        method: 'POST',
      }),
    }),

    getCurrent: builder.query<WrittenTestSession, SessionId>({
      query: (sessionId) => `/current/${sessionId}`,
    }),

    submitAnswer: builder.mutation<WrittenTestSession, SubmitAnswerPayload>({
      query: (data) => ({
        url: '/answer',
        method: 'POST',
        body: data,
      }),
    }),

    /* ───────────── Result & Time ───────────── */

    getResult: builder.query<WrittenTestResult, SessionId>({
      query: (sessionId) => `/result/${sessionId}`,
    }),

    getTimeLeft: builder.query<{ timeLeft: number }, SessionId>({
      query: (sessionId) => `/time/${sessionId}`,
    }),

    /* ───────────── PDF Download (Blob-safe) ───────────── */

    downloadPdf: builder.query<Blob, SessionId>({
      query: (sessionId) => ({
        url: `/result/${sessionId}/pdf`,
        method: 'GET',
        headers: {
          Accept: 'application/pdf',
        },
        responseHandler: (response) => response.blob(),
      }),

      // IMPORTANT:
      // Do NOT cache Blob in Redux store (avoids non-serializable errors)
      keepUnusedDataFor: 0,
    }),
  }),
});

/* ─────────────────────────────
   Auto-generated Hooks
───────────────────────────── */
export const {
  useInitSessionMutation,
  useStartSessionMutation,
  useGetCurrentQuery,
  useSubmitAnswerMutation,
  useGetResultQuery,
  useGetTimeLeftQuery,
  useLazyDownloadPdfQuery,
} = writtenTestApi;
