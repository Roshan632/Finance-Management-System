import { baseApi } from "./baseApi";

export const reminderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET All Reminders
    getReminders: builder.query({
      query: () => "/reminders",
      providesTags: ["Reminder"],
    }),

    // GET Single Reminder
    getReminder: builder.query({
      query: (id) => `/reminders/${id}`,
      providesTags: (result, error, id) => [
        { type: "Reminder", id },
      ],
    }),

    // POST Reminder
    addReminder: builder.mutation({
      query: (data) => ({
        url: "/reminders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reminder"],
    }),

    // PATCH Reminder
    updateReminder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/reminders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Reminder",
        { type: "Reminder", id },
      ],
    }),

    // DELETE Reminder (Soft Delete)
    deleteReminder: builder.mutation({
      query: (id) => ({
        url: `/reminders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reminder"],
    }),

    // Complete Reminder
    completeReminder: builder.mutation({
      query: (id) => ({
        url: `/reminders/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Reminder"],
    }),

    // Upload Attachment
    uploadReminderAttachment: builder.mutation({
      query: ({ id, attachment }) => ({
        url: `/reminders/${id}/attachments`,
        method: "POST",
        body: attachment,
      }),
      invalidatesTags: ["Reminder"],
    }),

    // Delete Attachment
    deleteReminderAttachment: builder.mutation({
      query: ({ id, attachmentId }) => ({
        url: `/reminders/${id}/attachments/${attachmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reminder"],
    }),

  }),
});

export const {
  useGetRemindersQuery,
  useGetReminderQuery,
  useAddReminderMutation,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
  useCompleteReminderMutation,
  useUploadReminderAttachmentMutation,
  useDeleteReminderAttachmentMutation,
} = reminderApi;