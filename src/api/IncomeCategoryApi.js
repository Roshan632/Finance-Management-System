import { baseApi } from "./baseApi";

export const incomeCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncomeCategory: builder.query({
      query: () => "/income-category",
      providesTags: ["IncomeCategory"],
    }),
  }),
});

export const { useGetIncomeCategoryQuery } = incomeCategoryApi;