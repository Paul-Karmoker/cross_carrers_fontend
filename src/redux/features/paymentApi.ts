// src/redux/features/paymentApi.ts

import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.crosscareers.com/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
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

  if (result.error?.status === 401) {
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.");
  }

  return result;
};

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile"],

  endpoints: (builder) => ({
    startBkashPayment: builder.mutation<
      { bkashURL: string; paymentID: string },
      { plan: "monthly" | "quarterly" | "semiannual" | "yearly" }
    >({
      query: (body) => ({
        url: "/payment/bkash/start",
        method: "POST",
        body,
      }),
    }),

    confirmBkashPayment: builder.mutation<
      { message: string },
      { paymentID: string }
    >({
      query: (body) => ({
        url: "/payment/bkash/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useStartBkashPaymentMutation,
  useConfirmBkashPaymentMutation,
} = paymentApi;
