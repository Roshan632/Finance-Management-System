import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  useAddNoteMutation,
  useUpdateNoteMutation,
} from "../../api/noteApi";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  color_label: z.string().min(1, "Color is required"),
});

const NoteForm = ({ selectedNote, closeModal }) => {
  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      color_label: "blue",
    },
  });

  useEffect(() => {
    if (selectedNote) {
      reset({
        title: selectedNote.title,
        description: selectedNote.description,
        color_label: selectedNote.color_label,
      });
    } else {
      reset({
        title: "",
        description: "",
        color_label: "blue",
      });
    }
  }, [selectedNote, reset]);

  const onSubmit = async (data) => {
    try {
      if (selectedNote) {
        await updateNote({
          id: selectedNote.id,
          ...data,
        }).unwrap();

        toast.success("Note updated successfully");
      } else {
        await addNote(data).unwrap();

        toast.success("Note created successfully");
      }

      reset();
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <h2 className="text-2xl font-bold">
        {selectedNote ? "Update Note" : "Add Note"}
      </h2>

      <div>
        <label className="block font-medium mb-1">
          Title *
        </label>

        <input
          {...register("title")}
          className="w-full border rounded-lg p-3"
          placeholder="Enter title"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.title?.message}
        </p>
      </div>

      <div>
        <label className="block font-medium mb-1">
          Description
        </label>

        <textarea
          rows={5}
          {...register("description")}
          className="w-full border rounded-lg p-3"
          placeholder="Write your note..."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Color Label
        </label>

        <select
          {...register("color_label")}
          className="w-full border rounded-lg p-3"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
          <option value="purple">Purple</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        {selectedNote ? "Update Note" : "Save Note"}
      </button>
    </form>
  );
};

export default NoteForm;