import { baseApi } from "./baseApi";

export const cashflowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCashflow: builder.query({
      query: () => "/cashflow",
      providesTags: ["Cashflow"],
    }),
  }),
});

export const { useGetCashflowQuery } = cashflowApi;