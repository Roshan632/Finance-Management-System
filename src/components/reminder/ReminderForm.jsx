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
  if (selectedReminder) {
    reset({
      title: selectedReminder.title || "",
      description: selectedReminder.description || "",
      reminder_date: selectedReminder.reminder_date || "",
      reminder_time: selectedReminder.reminder_time || "",
      priority: selectedReminder.priority || "MEDIUM",
      repeat: selectedReminder.repeat || "NONE",
      attachments: selectedReminder.attachments || [],
    });

    queueMicrotask(() => {
      setSelectedFiles(selectedReminder.attachments || []);
    });
  } else {
    reset({
      title: "",
      description: "",
      reminder_date: "",
      reminder_time: "",
      priority: "MEDIUM",
      repeat: "NONE",
      attachments: [],
    });

    queueMicrotask(() => {
      setSelectedFiles([]);
    });
  }
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
      className="space-y-4 w-full"
    >
      <h2 className="text-2xl font-bold">
        {selectedReminder ? "Update Reminder" : "Add Reminder"}
      </h2>

      {/* Title */}
     {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      <div>
        <label className="block mb-2 font-medium">
           Enter Reminder Title :
        </label>
        <input
          type="text" placeholder="Enter Reminder Title"
          {...register("title")}
          className="w-full border rounded-lg p-3"
        />
        <p className="text-red-500 text-sm mt-1">
          {errors.title?.message}
        </p>
      </div>

      {/* Description */}

      <div>
        <label className=" block mb-2 font-medium">
           Enter Description :
        </label>
        <textarea rows={4}
            {...register("description")}
            className="w-full border rounded-lg p-3 resize-none"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.description?.message}
        </p>
      </div>

      {/* Reminder Date */}

      
        <label className=" block mb-2 font-medium">
            Choose Reminder Date :
        </label>
        <input type="date"
            {...register("reminder_date")}
            className="w-full border rounded-lg p-3"
        />

        <p className="text-red-500 text-sm mt-1">
          {errors.reminder_date?.message}
        </p>
        
      

      {/* Reminder Time */}
      <div>
      <label className="block mb-2 font-medium">
            Choose Reminder Time :
        </label>

        <input type="time"
            {...register("reminder_time")}
            className=" border rounded-lg p-3"
        />
        <p className="text-red-500 text-sm mt-1">
            {errors.reminder_time?.message}
        </p>
        </div>

      {/* Priority */}
           {/* Priority & Repeat */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium">
            Choose Priority :
          </label>

          <select
            {...register("priority")}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <p className="text-red-500 text-sm mt-1">
            {errors.priority?.message}
          </p>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Choose Reminder Repeat :
          </label>

          <select
            {...register("repeat")}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="NONE">None</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>

          <p className="text-red-500 text-sm mt-1">
            {errors.repeat?.message}
          </p>
        </div>

      </div>

      {/* Attachments */}

      <div>

        <label className="block mb-2 font-medium">
          Attachments
        </label>

        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
          onChange={handleFileChange}
          className="w-full border rounded-lg p-3"
        />

        {selectedFiles.length > 0 && (

          <div className="mt-4 border rounded-xl p-4 bg-gray-50">

            <h3 className="font-semibold mb-3">
              Selected Attachments
            </h3>

            <div className="space-y-3">

              {selectedFiles.map((file, index) => (

                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border rounded-lg p-3 bg-white"
                >

                  <div className="flex-1">

                    <p className="font-medium break-all">
                      📎 {file.fileName || file.name}
                    </p>

                    <p className="text-xs text-gray-500">

                      {(
                        (file.fileSize || file.size) /
                        1024
                      ).toFixed(2)}{" "}
                      KB

                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

      {/* Submit Button */}

      <div className="pt-2">

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg"
        >
          {selectedReminder
            ? "Update Reminder"
            : "Save Reminder"}
        </button>

      </div>

    </form>
  );
};

export default ReminderForm;