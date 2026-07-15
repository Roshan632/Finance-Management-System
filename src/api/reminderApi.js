import { baseApi } from "./baseApi";

export const reminderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReminders: builder.query({
      query: () => "/reminders",
      providesTags: ["Reminders"],
    }),
  }),
});

export const {
  useGetRemindersQuery,
} = reminderApi;