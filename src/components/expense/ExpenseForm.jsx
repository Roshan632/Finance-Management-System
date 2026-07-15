
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {useState} from 'react'
import {
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} from "../../api/expenseApi";

const schema = z.object({
  expense_date: z.string().min(1, "Expense Date is required"),

  amount: z.coerce
    .number().positive("Amount must be greater than 0"),

  expense_category_id: z.string().min(1, "Expense Category is required"),

  vendor_name: z.string().optional(),

  payment_method: z.string().min(1, "Payment Method is required"),

  bill_number: z.string().optional(),

  description: z.string().optional(),
  attachments:z.any().optional(),
});

const ExpenseForm = ({ closeModal, selectedExpense }) => {
  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues:
      selectedExpense || {
        expense_date: "",
        amount: "",
        expense_category_id: "",
        vendor_name: "",
        payment_method: "",
        bill_number: "",
        description: "",
      },
  });

 useEffect(() => {
  reset(
    selectedExpense || {
      expense_date: "",
      amount: "",
      expense_category_id: "",
      vendor_name: "",
      payment_method: "",
      bill_number: "",
      description: "",
    }
  );
}, [selectedExpense, reset]);

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
      };

      if (selectedExpense) {
        await updateExpense({
          id: selectedExpense.id,
          ...payload,
        }).unwrap();

        toast.success("Expense updated successfully");
      } else {
        await addExpense(payload).unwrap();

        toast.success("Expense added successfully");
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
        {selectedExpense ? "Update Expense" : "Add Expense"}
      </h2>

      {/* Expense Date */}

      <div>
        <label className="font-medium">
          Expense Date *
        </label>

        <input
          type="date"
          {...register("expense_date")}
          className="w-full border rounded-lg p-3 mt-1"
        />

        <p className="text-red-500 text-sm">
          {errors.expense_date?.message}
        </p>
      </div>

      {/* Amount */}

      <div>
        <label className="font-medium">
          Amount *
        </label>

        <input
          type="number"
          placeholder="Enter Amount"
          {...register("amount")}
          className="w-full border rounded-lg p-3 mt-1"
        />

        <p className="text-red-500 text-sm">
          {errors.amount?.message}
        </p>
      </div>

      {/* Category */}

      <div>
        <label className="font-medium">
          Expense Category *
        </label>

        <select
          {...register("expense_category_id")}
          className="w-full border rounded-lg p-3 mt-1"
        >
          <option value="">Select Category</option>

          <option>Salary</option>
          <option>Bonus</option>
          <option>Allowance</option>
          <option>Freelancer Payment</option>

          <option>Rent</option>
          <option>Electricity</option>
          <option>Water</option>
          <option>Internet</option>

          <option>Stationery</option>
          <option>Office Supplies</option>
          <option>Furniture</option>

          <option>Maintenance</option>
          <option>Cleaning</option>

          <option>Server</option>
          <option>Hosting</option>
          <option>Domain</option>
          <option>SSL</option>

          <option>Software Subscription</option>
          <option>API Charges</option>
        </select>

        <p className="text-red-500 text-sm">
          {errors.expense_category_id?.message}
        </p>
      </div>

      {/* Vendor */}

      <div>
        <label className="font-medium">
          Vendor Name
        </label>

        <input
          placeholder="Vendor Name"
          {...register("vendor_name")}
          className="w-full border rounded-lg p-3 mt-1"
        />
      </div>

      {/* Payment */}

      <div>
        <label className="font-medium">
          Payment Method *
        </label>

        <select
          {...register("payment_method")}
          className="w-full border rounded-lg p-3 mt-1"
        >
          <option value="">Select Payment Method</option>

          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>Cheque</option>
          <option>eSewa</option>
          <option>Khalti</option>
          <option>Other</option>
        </select>

        <p className="text-red-500 text-sm">
          {errors.payment_method?.message}
        </p>
      </div>

      {/* Bill Number */}

      <div>
        <label className="font-medium">
          Bill Number
        </label>

        <input
          placeholder="Bill Number"
          {...register("bill_number")}
          className="w-full border rounded-lg p-3 mt-1"
        />
      </div>

      {/* Description */}

      <div>
        <label className="font-medium">
          Description
        </label>

        <textarea
          rows={4}
          placeholder="Description"
          {...register("description")}
          className="w-full border rounded-lg p-3 mt-1"
        />
      </div>

      <div>

  <label className="block text-sm font-medium mb-2">
    Attachments
  </label>

  <input
    type="file"
    multiple
    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
    onChange={handleFileChange}
    className="w-full border rounded-lg p-3"
  />

</div>
{selectedFiles.length > 0 && (

   <div className="mt-3 border rounded-lg p-3 bg-gray-50">

    <div className="p-3 font-semibold border-b">
      Selected Attachments
    </div>

    {selectedFiles.map((file, index) => (

      <div
        key={index}
        className="flex justify-between items-center py-2 border-b last:border-none"
      >
       <div>
        <p className="font-medium">
          📎 {file.fileName || file.name }
        </p>

        <p className="text-xs text-gray-500">
          {((file.fileSize || file.size)/1024).toFixed(2)} KB
        </p>

      </div>
      <button type="button" onClick={()=> removeFile(index)}
      className="text-red-600 hover:text-red-800 text-sm">
        Remove
        </button>
        </div>

    ))}

    </div>

   )}

      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg">
        {selectedExpense ? "Update Expense" : "Save Expense"}
      </button>
      

      
    </form>
    
  );
};

export default ExpenseForm;