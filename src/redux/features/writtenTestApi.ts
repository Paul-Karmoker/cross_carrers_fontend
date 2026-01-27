import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  InitSessionPayload,
  SessionResponse,
  QuestionData,
  SubmitAnswerPayload,
  TimeLeftResponse,
  AssessmentResult,
  SubmitAnswerResponse,
} from "../../app/components/WrittenTest/types";

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
    initSession: builder.mutation<SessionResponse, InitSessionPayload>({
      query: (data) => ({
        url: "/init",
        method: "POST",
        body: data,
      }),
    }),

    startSession: builder.mutation<void, string>({
      query: (sessionId) => ({
        url: `/start/${sessionId}`,
        method: "POST",
      }),
    }),

    getCurrent: builder.query<QuestionData, string>({
      query: (sessionId) => `/current/${sessionId}`,
    }),

    submitAnswer: builder.mutation<
      SubmitAnswerResponse,
      SubmitAnswerPayload
    >({
      query: (data) => ({
        url: "/answer",
        method: "POST",
        body: data,
      }),
    }),

    getResult: builder.query<AssessmentResult, string>({
      query: (sessionId) => `/result/${sessionId}`,
    }),

    getTimeLeft: builder.query<TimeLeftResponse, string>({
      query: (sessionId) => `/time/${sessionId}`,
    }),

    getPdfDownload: builder.query<Blob, string>({
      query: (sessionId) => ({
        url: `/result/${sessionId}/pdf`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
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
  useLazyGetPdfDownloadQuery,
} = writtenTestApi;
