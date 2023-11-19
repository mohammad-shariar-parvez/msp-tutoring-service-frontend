import { storeUserInfo } from "@/services/auth.service";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData
      }),
      invalidatesTags: [tagTypes.user]
    }),
    userSignUp: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: loginData
      }),
      invalidatesTags: [tagTypes.user]
    }),
    oAuthAccess: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/oauth`,
        method: "POST",
        data: loginData
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("redux res", result?.data?.accessToken);

          // storeUserInfo({ accessToken: result?.data?.accessToken });
          localStorage.setItem(
            "accessToken",
            JSON.stringify({
              accessToken: result?.data?.accessToken,
            }),
          );

        }
        catch (err) {
          // do nothing
        }
      },
      invalidatesTags: [tagTypes.user]
    },),
    changePassword: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/change-password`,
        method: "POST",
        data: loginData
      }),
      invalidatesTags: [tagTypes.user]
    }),
    resetPassword: build.mutation({
      query: (resetPasswordPayload) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        data: resetPasswordPayload,
      }),
    }),
    forgotPassword: build.mutation({
      query: (forgotPasswordPayload) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: forgotPasswordPayload,
      }),
    }),
  }),

});

export const { useUserLoginMutation, useUserSignUpMutation, useChangePasswordMutation, useForgotPasswordMutation,
  useResetPasswordMutation, useOAuthAccessMutation } = authApi;