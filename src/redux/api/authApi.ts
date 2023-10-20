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
    changePassword: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/change-password`,
        method: "POST",
        data: loginData
      }),
      invalidatesTags: [tagTypes.user]
    }),
  }),

});

export const { useUserLoginMutation, useUserSignUpMutation, useChangePasswordMutation } = authApi;