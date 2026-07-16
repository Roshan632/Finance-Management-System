import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  useAddReminderMutation,
  useUpdateReminderMutation,
} from "../../api/reminderApi";

const schema = z.object({
  title: z.string().min(1, "Title is required"),

  description:z.string().optional(),
   reminder_date: z.string().min(1, "Reminder date is required"),

  reminder_time: z.string().min(1, "Reminder time is required"),

  priority: z.string().min(1, "Priority is required"),

  repeat: z.string().min(1, "Repeat is required"),

  attachments: z.any().optional(),
});
  
 

 

const ReminderForm = ({ closeModal, selectedReminder }) => {
  const [addReminder] = useAddReminderMutation();
  const [updateReminder] = useUpdateReminderMutation();
  const [selectedFiles,setSelectedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: 
     {
      title: "",
      description: "",
      reminder_date: "",
      reminder_time: "",
      priority: "MEDIUM",
      repeat: "NONE",
      attachments:[],
  },
      
      
    
  });
useEffect(() => {
  reset(
    selectedReminder || {
      title: "",
      
      description: "",
      reminder_date: "",
      reminder_time: "",
      priority: "MEDIUM",
      repeat: "NONE",
    }
  );
}, [selectedReminder, reset]);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const updatedFiles = [...selectedFiles, ...files];

  setSelectedFiles(updatedFiles);

  setValue("attachments", updatedFiles);
};

const removeFile = (index) => {
  const updatedFiles = selectedFiles.filter(
    (_, i) => i !== index
  );

  setSelectedFiles(updatedFiles);

  setValue("attachments", updatedFiles);
};

  const onSubmit = async (data) => {
    try {
      const payload={
        ...data,
        attachments:selectedFiles.map((file)=>({
          id:file.id || crypto.randomUUID(),
          fileName:file.fileName || file.name,
          fileSize:file.fileSize || file.size,
          fileType:file.fileType || file.type,
        }))
      }
      if (selectedReminder) {
        await updateReminder({
          id: selectedReminder.id,
          ...payload,
        }).unwrap();

        toast.success("Reminder updated successfully");
      } else {
        await addReminder(payload).unwrap();

        toast.success("Reminder added successfully");
      }

      reset();
      setSelectedFiles([]);
      setValue("attachments",[]);

      closeModal();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold">
        {selectedReminder ? "Update Reminder" : "Add Reminder"}
      </h2>

      {/* Title */}

      <div>
        <label className="font-medium">
            Reminder Title
        </label>
        <input
          type="text" placeholder="Enter Reminder Title"
          {...register("title")}
          className="w-full border rounded-lg p-3"
        />
        <p className="text-red-500 text-sm">
          {errors.title?.message}
        </p>
      </div>

      {/* Description */}

      <div>
        <textarea rows={4}
            {...register("description")}
            className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.description?.message}
        </p>
      </div>

      {/* Reminder Date */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="date"
            {...register("reminder_date")}
            className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.reminder_date?.message}
        </p>
      

      {/* Reminder Time */}

        <input type="time"
            {...register("reminder_time")}
            className="w-full border rounded-lg p-3"
        />
        <p className="text-red-500 text-sm">
            {errors.reminder_time?.message}
        </p>
        </div>

      {/* Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <select {...register("priority")} className="w-full border rounded-lg p-3">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
        </select>
        <p className="text-red-500 text-sm">
            {errors.priority?.message}
        </p>

      {/* Repeat */}

      
        <select
            {...register("repeat")} className="w-full border rounded-lg p-3">
            <option value="NONE">None</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
        </select>

        <p className="text-red-500 text-sm">
          {errors.repeat?.message}
        </p>
      </div>

      {/* Attachments */}

      <div>
        <label className="block text-sm font-medium mb-2">
          Attachments
        </label>

        <input type="file" multiple accept=".pdf,.jpeg,.png,.doc,.docx"
        onChange={handleFileChange}
        className="w-full border rounded-lg p-3"
        />

        {selectedFiles.length > 0 && (
  <div className="mt-3 border rounded-lg p-3 bg-gray-50">

    <div className="font-semibold border-b pb-2 mb-2">
      Selected Attachments
    </div>

    {selectedFiles.map((file, index) => (
      <div
        key={index}
        className="flex justify-between items-center py-2 border-b last:border-none"
      >
        <div>
          <p className="font-medium">
            📎 {file.fileName || file.name}
          </p>

          <p className="text-xs text-gray-500">
            {((file.fileSize || file.size) / 1024).toFixed(2)} KB
          </p>
        </div>

        <button
          type="button"
          onClick={() => removeFile(index)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        {selectedReminder ? "Update Reminder" : "Save Reminder"}
      </button>
    </form>
  );
};

export default ReminderForm;