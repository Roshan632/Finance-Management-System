import { baseApi } from "./baseApi";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getReports: builder.query({
      query: () => "/reports",
    }),

  }),
});

export const {
  useGetReportsQuery,
} = reportApi;