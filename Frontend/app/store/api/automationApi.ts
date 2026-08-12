import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";

export const automationApi = createApi({
  reducerPath: "automationApi",

  baseQuery,

  endpoints: (builder) => ({
    createAutomation: builder.mutation({
      query: (automationData) => ({
        url: "/automation",
        method: "POST",
        body: automationData,
      }),
    }),

    getAutomations: builder.query<any, void>({
      query: () => "/automation",
    }),

    uploadFile: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useCreateAutomationMutation,
  useGetAutomationsQuery,
  useUploadFileMutation
} = automationApi;