
import { baseApi } from "./baseApi";

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getExpenses: builder.query({
      query: () => "/expenses",
      providesTags: ["Expense"],
    }),

    getExpenseById: builder.query({
       query: (id) => `/expenses/${id}`,
    }),

    uploadExpenseAttachment: builder.mutation({
  query: ({ id, attachments }) => ({
    url: `/expenses/${id}/attachments`,
    method: "POST",
    body: { attachments },
  }),
  invalidatesTags: ["Expense"],
}),

deleteExpenseAttachment: builder.mutation({
  query: ({ expenseId, attachmentId }) => ({
    url: `/expenses/${expenseId}/attachments/${attachmentId}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Expense"],
}),
exportExpense: builder.query({
  query: (format = "pdf") => ({
    url: `/expenses/export?format=${format}`,
    method: "GET",
    responseHandler: async (response) => response.blob(),
  }),
}),


    addExpense: builder.mutation({
      query: (data) => ({
        url: "/expenses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),

    updateExpense: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),

  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useUploadExpenseAttachmentMutation,
  useDeleteExpenseAttachmentMutation,
  useLazyExportExpenseQuery,
} = expenseApi;