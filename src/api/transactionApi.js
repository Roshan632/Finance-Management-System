import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/transactions",
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
} = transactionApi;