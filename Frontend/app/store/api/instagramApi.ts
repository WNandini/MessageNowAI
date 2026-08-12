import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";

export const instagramApi = createApi({
  reducerPath: "instagramApi",
  baseQuery,

  endpoints: (builder) => ({
    getInstagramPosts: builder.query<any[], void>({
      query: () => "/instagram/posts",
      transformResponse: (response: {
        success: boolean;
        data: any[];
      }) => response.data,
    }),
    getActivities: builder.query<any, void>({
      query: () => "/activity",
    }),
  }),
});

export const {
  useGetInstagramPostsQuery,
  useGetActivitiesQuery
} = instagramApi;