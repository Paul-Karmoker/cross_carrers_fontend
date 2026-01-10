import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";

// =============================================
//              Base Query with better error handling
// =============================================
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Optional: bKash API-র ক্ষেত্রে কিছু ক্ষেত্রে এটা দরকার হয়
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

/**
 * Optional: Global error handler + auto logout on 401
 */
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // 401 Unauthorized → token expired or invalid → logout
  if (result.error) {
    const err = result.error as FetchBaseQueryError;

    if (err.status === 401) {
      localStorage.removeItem("token");
      // Optional: redirect to login
      // window.location.href = "/login?session_expired=true";
      toast.error("Session expired. Please login again.");
    }

    // Better error message for toast
    if (err.status === 400 || err.status === 422) {
      const data = err.data as any;
      const message =
        data?.message ||
        data?.error ||
        data?.errors?.[0]?.msg ||
        "Request failed. Please try again.";
      toast.error(message);
    }
  }

  return result;
};

// =============================================
//              Types
// =============================================
export type SubscriptionPlan =
  | "monthly"
  | "quarterly"
  | "semiannual"
  | "yearly";

interface StartBkashRequest {
  plan: SubscriptionPlan;
}

interface StartBkashResponse {
  success: boolean;
  bkashURL: string;
  paymentID: string;
  // অনেক সময় আরো ফিল্ড আসে (merchantInvoiceNumber, amount ইত্যাদি)
}

interface ConfirmBkashRequest {
  paymentID: string;
  plan: SubscriptionPlan;
}

interface ConfirmBkashResponse {
  success: boolean;
  message: string;
  subscription?: {
    plan: SubscriptionPlan;
    expiryDate: string;
    // ... more fields
  };
}

// =============================================
//              Payment API
// =============================================
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth, // ← improved version use করা হচ্ছে
  tagTypes: ["Subscription", "User"],
  endpoints: (builder) => ({
    startBkashPayment: builder.mutation<StartBkashResponse, StartBkashRequest>({
      query: (body) => ({
        url: "/payment/bkash/start",
        method: "POST",
        body,
      }),
      // Optional: retry on network failure
      extraOptions: { maxRetries: 2 },
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