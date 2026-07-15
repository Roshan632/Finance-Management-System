import { baseApi } from "./baseApi";

export const incomeExpenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomeExpense: builder.query({
      query: () => "/income-expense",
      providesTags: ["IncomeExpense"],
    }),
  }),
});

export const { useGetIncomeExpenseQuery } = incomeExpenseApi;