import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = "https://api.crosscareers.com/api/v1/auth";
export interface AuthResponse {
  success?: boolean;
  token?: string;
  message?: string;
  user?: {
    _id?: string;
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    subscriptionPlan?: string;
  };
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
  plan?: "free" | "paid";
  billingCycle?: "monthly" | "quarterly" | "semiannual" | "yearly";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface SubscriptionPayload {
  userId: string;
  subscriptionPlan: string;
  paymentId: string;
  transactionId: string;
  paymentProvider: "bkash" | "nagad";
  paymentNumber: string;
  amount: number;
}

export interface WithdrawPayload {
  amount: number;
}

/* =======================
   API
======================= */

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Withdrawals", "Profile"],

  endpoints: (builder) => ({
    /* ---------- AUTH ---------- */

    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response?.token) {
          localStorage.setItem("token", response.token);
        }
        return response;
      },
    }),

    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response?.token) {
          localStorage.setItem("token", response.token);
        }
        return response;
      },
    }),

    otpvarify: builder.mutation<AuthResponse, { email: string; otp: string }>({
      query: (body) => ({
        url: "verify-email-otp",
        method: "POST",
        body,
      }),
    }),

    /* ---------- OAuth ---------- */

    getGoogleAuthUrl: builder.query<{ url: string }, void>({
      query: () => "google",
    }),

    getFacebookAuthUrl: builder.query<{ url: string }, void>({
      query: () => "facebook",
    }),

    getLinkedInAuthUrl: builder.query<{ url: string }, void>({
      query: () => "linkedin",
    }),

    /* ---------- PASSWORD ---------- */

    forgotPassword: builder.mutation<AuthResponse, ForgotPasswordPayload>({
      query: (body) => ({
        url: "forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<AuthResponse, ResetPasswordPayload>({
      query: (body) => ({
        url: "reset-password",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<AuthResponse, ChangePasswordPayload>({
      query: (body) => ({
        url: "change-password",
        method: "PATCH",
        body,
      }),
    }),

    

    /* ---------- PROFILE ---------- */

    getProfile: builder.query<AuthResponse, void>({
      query: () => "get-profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<AuthResponse, Partial<AuthResponse["user"]>>({
      query: (body) => ({
        url: "profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    /* ---------- SUBSCRIPTION ---------- */

    subscribe: builder.mutation<AuthResponse, SubscriptionPayload>({
      query: (body) => ({
        url: "subcribe", // backend spelling preserved
        method: "POST",
        body,
      }),
    }),

    /* ---------- WITHDRAW ---------- */

    withdraw: builder.mutation<AuthResponse, WithdrawPayload>({
      query: (body) => ({
        url: "withdraw",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Withdrawals"],
    }),

    getWithdrawals: builder.query<AuthResponse[], void>({
      query: () => "withdraw",
      providesTags: ["Withdrawals"],
    }),
  }),
});

/* =======================
   Hooks Export
======================= */

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useOtpvarifyMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSubscribeMutation,
  useWithdrawMutation,
  useGetWithdrawalsQuery,
  useGetGoogleAuthUrlQuery,
  useGetFacebookAuthUrlQuery,
  useGetLinkedInAuthUrlQuery,
} = authApi;

/* =======================
   Logout Utility
======================= */

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
