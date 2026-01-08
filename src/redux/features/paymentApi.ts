import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base Query with Auth Header
 */
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4001/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

/**
 * Types
 */
export type SubscriptionPlan =
  | "monthly"
  | "quarterly"
  | "semiannual"
  | "yearly";

interface StartBkashRequest {
  plan: SubscriptionPlan;
}

interface StartBkashResponse {
  bkashURL: string;
  paymentID: string;
}

interface ConfirmBkashRequest {
  paymentID: string;
  plan: SubscriptionPlan;
}

interface ConfirmBkashResponse {
  message: string;
}

/**
 * Payment API
 */
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    
    startBkashPayment: builder.mutation<
      StartBkashResponse,
      StartBkashRequest
    >({
      query: (body) => ({
        url: "/payment/bkash/start",
        method: "POST",
        body,
      }),
    }),

    
    confirmBkashPayment: builder.mutation<
      ConfirmBkashResponse,
      ConfirmBkashRequest
    >({
      query: (body) => ({
        url: "/payment/bkash/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

/**
 * Hooks
 */
export const {
  useStartBkashPaymentMutation,
  useConfirmBkashPaymentMutation,
} = paymentApi;
