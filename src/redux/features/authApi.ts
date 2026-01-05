import { baseApi } from "../api/baseApi";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
} from "@/app/types";
import { tags } from "@/constants/tags";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { data } = await queryFulfilled;
        localStorage.setItem("token", data.accessToken);
      },
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { data } = await queryFulfilled;
        localStorage.setItem("token", data.accessToken);
      },
    }),

    getProfile: builder.query<AuthResponse["user"], void>({
      query: () => "/auth/get-profile",
      providesTags: [tags.User],
    }),

    updateProfile: builder.mutation<AuthResponse["user"], Partial<AuthResponse["user"]>>({
      query: (body) => ({
        url: "/auth/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tags.User],
    }),

    logout: builder.mutation<void, void>({
      queryFn: () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApi;
