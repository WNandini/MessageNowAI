import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const {
  useGetMeQuery,
} = authApi;