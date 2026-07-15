import { baseApi } from "./baseApi";

export const noteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get all notes
    getNotes: builder.query({
      query: () => "/notes",
      providesTags: ["Note"],
    }),

    // Get single note
    getNoteById: builder.query({
      query: (id) => `/notes/${id}`,
      providesTags: ["Note"],
    }),

    // Create note
    addNote: builder.mutation({
      query: (data) => ({
        url: "/notes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),

    // Update note (PATCH)
    updateNote: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),

    // Soft delete
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),

    // Pin / Unpin
    togglePin: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}/pin`,
        method: "PATCH",
      }),
      invalidatesTags: ["Note"],
    }),

    // Archive / Unarchive
    toggleArchive: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["Note"],
    }),

  }),
});

export const {

  useGetNotesQuery,
  useGetNoteByIdQuery,

  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,

  useTogglePinMutation,
  useToggleArchiveMutation,

} = noteApi;