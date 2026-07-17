import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeleteExpenseMutation } from "../../api/expenseApi";
import toast from "react-hot-toast";
import {FaEye} from "react-icons/fa";

const ExpenseRow = ({ expense, onEdit,onView, }) => {
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await deleteExpense(expense.id).unwrap();

      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
      console.log(error);
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-3">
        {expense.expense_date}
      </td>

      <td className="p-3">
        {expense.vendor_name || "-"}
      </td>

      <td className="p-3">
        {expense.expense_category_id}
      </td>

      <td className="p-3 text-right font-bold text-red-600">
        Rs. {Number(expense.amount).toLocaleString()}
      </td>

      <td className="p-3">
        {expense.payment_method}
      </td>

      <td className="p-3">
        {expense.bill_number || "-"}
      </td>

      <td className="p-3 max-w-xs truncate">
        {expense.description || "-"}
      </td>

      <td className="p-3">

        <div className="flex justify-center gap-3">

          <button onClick={()=>onView(expense.id)}
          className="text-green-600 hover:text-green-800">
            <FaEye/>
          </button>

          <button
            onClick={() => onEdit(expense)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>

          

          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default ExpenseRow;