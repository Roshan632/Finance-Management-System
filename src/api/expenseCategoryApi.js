import { baseApi } from "./baseApi";

export const expenseCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenseCategory: builder.query({
      query: () => "/expense-category",
      providesTags: ["ExpenseCategory"],
    }),
  }),
});

export const { useGetExpenseCategoryQuery } = expenseCategoryApi;