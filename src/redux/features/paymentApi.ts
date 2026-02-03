// src/redux/features/paymentApi.ts

import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

/* ===============================
   Base Query
================================ */

const rawBaseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    "https://api.crosscareers.com/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please login again.");
    }

    if (result.error.status === 400 || result.error.status === 422) {
      const data = result.error.data as any;
      toast.error(data?.message || "Request failed");
    }
  }

  return result;
};

/* ===============================
   Types
================================ */

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
  subscription: {
    plan: SubscriptionPlan;
    status: "active" | "expired";
    expiresAt: string;
  };
}

/* ===============================
   API
================================ */

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Subscription", "User"],

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
      invalidatesTags: ["Subscription", "User"],
    }),
  }),
});

export const {
  useStartBkashPaymentMutation,
  useConfirmBkashPaymentMutation,
} = paymentApi;
