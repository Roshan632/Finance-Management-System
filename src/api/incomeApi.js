import { baseApi } from "./baseApi";

export const incomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get all income record
    getIncomes: builder.query({
      query: () => "/incomes",
      providesTags: ["Income"],
    }),
    getIncomeById: builder.query({
  query: (id) => `/incomes/${id}`,
  providesTags: ["Income"],
}),
    
     //create income
    addIncome: builder.mutation({
      query: (data) => ({
        url: "/incomes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Income"],
    }),

    updateIncome: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/incomes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Income"],
    }),

    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/incomes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Income"],
    }),
    uploadIncomeAttachment:builder.mutation({
      query:({id,files})=>({
         url: `/incomes/${id}/attachments`,
       method: "POST",
       body: files,
  }),
}),
deleteIncomeAttachment: builder.mutation({
  query: ({ id, attachmentId }) => ({
    url: `/incomes/${id}/attachments/${attachmentId}`,
    method: "DELETE",
  }),
}),
exportIncome: builder.query({
  query: (format = "pdf") => ({
    url: `/incomes/export?format=${format}`,
    method: "GET",
    responseHandler: async (response) => response.blob(),
  }),
}),
      })
    })


export const {
  useGetIncomesQuery,
  useGetIncomeByIdQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useUploadIncomeAttachmentMutation,
  useDeleteIncomeAttachmentMutation,
  useLazyExportIncomeQuery

} = incomeApi;