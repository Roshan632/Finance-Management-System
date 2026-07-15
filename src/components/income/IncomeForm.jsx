// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { useEffect } from "react";
// import {
//   useAddIncomeMutation,
//   useUpdateIncomeMutation,
// } from "../../api/incomeApi";
// const schema = z.object({
//   transaction_date: z.string().min(1, "Transaction date is required"),

//   amount: z.coerce.number().positive("Amount must be greater than 0"),

//   income_category_id: z.string().min(1, "Category is required"),

//   income_source: z.string().optional(),

//   client_name: z.string().optional(),

//   payment_method: z.string().min(1, "Payment Method is required"),

//   reference_number: z.string().optional(),

//   invoice_number: z.string().optional(),

//   description: z.string().optional(),
// });



// const IncomeForm = ({ closeModal,selectedIncome, }) => {

//  const [addIncome] = useAddIncomeMutation();
// const [updateIncome] = useUpdateIncomeMutation();

//   const {
//   register,
//   handleSubmit,
//   reset,
//   formState: { errors },
// } = useForm({
//   resolver: zodResolver(schema),
//   defaultValues: selectedIncome || {
//     source: "",
//     category: "",
//     amount: "",
//     paymentMethod: "",
//     date: "",
//   },
// });


//     useEffect(() => {
//   if (selectedIncome) {
//     reset(selectedIncome);
//   }
// }, [selectedIncome, reset]);


//   const onSubmit = async(data) => {

//     if (selectedIncome) {
//         await updateIncome({
//             id: selectedIncome.id,
//             ...data,
//         });
//         toast.success("Income updated successfully");
//     } else {
//         await addIncome(data);
//         toast.success("Income added successfully");
//     }

    

 

//     reset();

//     closeModal();

//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4"
//     >

//       <h2 className="text-2xl font-bold">
//         Add Income
//       </h2>

//       <input
//         placeholder="Source"
//         {...register("source")}
//         className="w-full border rounded-lg p-3"
//       />

//       <p className="text-red-500 text-sm">
//         {errors.source?.message}
//       </p>

//       <input
//         placeholder="Category"
//         {...register("category")}
//         className="w-full border rounded-lg p-3"
//       />

//       <input
//         type="number"
//         placeholder="Amount"
//         {...register("amount")}
//         className="w-full border rounded-lg p-3"
//       />

//       <input
//         placeholder="Payment Method"
//         {...register("paymentMethod")}
//         className="w-full border rounded-lg p-3"
//       />

//       <input
//         type="date"
//         {...register("date")}
//         className="w-full border rounded-lg p-3"
//       />

//       <button
//   className="w-full bg-green-600 text-white py-3 rounded-lg"
// >
//   {selectedIncome ? "Update Income" : "Save Income"}
// </button>
        

//     </form>
//   );
// };

// export default IncomeForm;




import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  useAddIncomeMutation,
  useUpdateIncomeMutation,
} from "../../api/incomeApi";

const schema = z.object({
  transaction_date: z.string().min(1, "Transaction Date is required"),

  amount: z.coerce
    .number()
    .positive("Amount must be greater than 0"),

  income_category_id: z.string().min(1, "Category is required"),

  income_source: z.string().optional(),

  client_name: z.string().optional(),

  payment_method: z.string().min(1, "Payment Method is required"),

  reference_number: z.string().optional(),

  invoice_number: z.string().optional(),

  description: z.string().optional(),

  attachments:z.any().optional(),
});

const IncomeForm = ({ closeModal, selectedIncome }) => {
  const [addIncome] = useAddIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();
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
      selectedIncome || {
      transaction_date: "",
      amount: "",
      income_category_id: "",
      income_source: "",
      client_name: "",
      payment_method: "",
      reference_number: "",
      invoice_number: "",
      description: "",
      
      
    },
  });
useEffect(() => {
  reset(
    selectedIncome || {
      transaction_date: "",
      amount: "",
      income_category_id: "",
      income_source: "",
      client_name: "",
      payment_method: "",
      reference_number: "",
      invoice_number: "",
      description: "",
    }
  );
}, [selectedIncome, reset]);

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
          fileType:file.fileType || file.Type,
        }))
      }
      if (selectedIncome) {
        await updateIncome({
          id: selectedIncome.id,
          ...payload,
        }).unwrap();

        toast.success("Income updated successfully");
      } else {
        await addIncome(payload).unwrap();

        toast.success("Income added successfully");
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
        {selectedIncome ? "Update Income" : "Add Income"}
      </h2>

      {/* Transaction Date */}

      <div>
        <input
          type="date"
          {...register("transaction_date")}
          className="w-full border rounded-lg p-3"
        />
        <p className="text-red-500 text-sm">
          {errors.transaction_date?.message}
        </p>
      </div>

      {/* Amount */}

      <div>
        <input
          type="number"
          placeholder="Amount"
          {...register("amount")}
          className="w-full border rounded-lg p-3"
        />
        <p className="text-red-500 text-sm">
          {errors.amount?.message}
        </p>
      </div>

      {/* Category */}

      <div>
        <select
          {...register("income_category_id")}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Category</option>
          <option value="Salary">Salary</option>
          <option value="Business">Business</option>
          <option value="Freelancing">Freelancing</option>
          <option value="Investment">Investment</option>
          <option value="Rental">Rental</option>
          <option value="Other">Other</option>
        </select>

        <p className="text-red-500 text-sm">
          {errors.income_category_id?.message}
        </p>
      </div>

      {/* Income Source */}

      <input
        placeholder="Income Source"
        {...register("income_source")}
        className="w-full border rounded-lg p-3"
      />

      {/* Client Name */}

      <input
        placeholder="Client Name"
        {...register("client_name")}
        className="w-full border rounded-lg p-3"
      />

      {/* Payment */}

      <div>
        <select
          {...register("payment_method")}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cheque">Cheque</option>
          <option value="eSewa">eSewa</option>
          <option value="Khalti">Khalti</option>
          <option value="Other">Other</option>
        </select>

        <p className="text-red-500 text-sm">
          {errors.payment_method?.message}
        </p>
      </div>

      {/* Reference */}

      <input
        placeholder="Reference Number"
        {...register("reference_number")}
        className="w-full border rounded-lg p-3"
      />

      {/* Invoice */}

      <input
        placeholder="Invoice Number"
        {...register("invoice_number")}
        className="w-full border rounded-lg p-3"
      />

      {/* Description */}

      <textarea
        rows={4}
        placeholder="Description"
        {...register("description")}
        className="w-full border rounded-lg p-3"
      />
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
        {selectedIncome ? "Update Income" : "Save Income"}
      </button>
    </form>
  );
};

export default IncomeForm;