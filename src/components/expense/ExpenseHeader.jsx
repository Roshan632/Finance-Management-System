

import { FaPlus } from "react-icons/fa";

import ExpenseModal from "./ExpenseModal";
import ExpenseForm from "./ExpenseForm";
import { FaDownload } from "react-icons/fa";
import { useLazyExportExpenseQuery } from "../../api/expenseApi";
import toast from "react-hot-toast";

const ExpenseHeader = ({open,setOpen,selectedExpense,setSelectedExpense}) => {

 const [exportExpense] = useLazyExportExpenseQuery();
 const handleExport = async (format)=>{
  try{
    const blob = await exportExpense(format).unwrap();
    const url=window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href=url;
    link.download = `expenses.${format}`;
    document.body.appenChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    toast.success(`Expense exported as ${format.toUpperCase()}`);

  }catch (err){
    toast.error(err,"Export failed");
  }
 };
  return (
    <>

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Expense Management
          </h1>

          <p className="text-gray-500">
            Manage all your Expense records
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedExpense(null);
            setOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add Expense
        </button>

      </div>
      <div className="flex gap-3">

        <button onClick={()=> handleExport("pdf")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center gap-2">
          <FaDownload/>
          PDF
        </button>

        <button onClick={()=>handleExport("excel")}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center gap-2">
          <FaDownload/>
          Excel
        </button>

        <button onClick={()=>handleExport("csv")}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg flex items-center gap-2">
          <FaDownload/>
          CSV
          </button>     
           </div>

      <ExpenseModal
        open={open}
        onClose={() => {
            setOpen(false);
            setSelectedExpense(null);
        }}
      >
        <ExpenseForm 
          selectedExpense={selectedExpense}
        closeModal={() => {
            setOpen(false);
        setSelectedExpense(null);
        }}

        />
      </ExpenseModal>

    </>
  );
};

export default ExpenseHeader;