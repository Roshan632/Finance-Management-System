
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useDeleteIncomeMutation } from "../../api/incomeApi";
import toast from "react-hot-toast";

const IncomeRow = ({ income, onEdit,onView, }) => {
  const [deleteIncome] = useDeleteIncomeMutation();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this income record?"
    );

    if (!confirmDelete) return;

    await deleteIncome(income.id);

    toast.success("Income deleted successfully");
  };

  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-3 whitespace-nowrap">
        {income.transaction_date}
      </td>

      <td className="p-3">
        {income.income_source || "-"}
      </td>

      <td className="p-3">
        {income.client_name || "-"}
      </td>

      <td className="p-3">
        {income.income_category_id}
      </td>

      <td className="p-3 text-right font-bold text-green-600 whitespace-nowrap">
        Rs. {Number(income.amount).toLocaleString()}
      </td>

      <td className="p-3">
        {income.payment_method}
      </td>

      <td className="p-3">
        {income.reference_number || "-"}
      </td>

      <td className="p-3">
        {income.invoice_number || "-"}
      </td>

      <td
        className="p-3 max-w-55 truncate"
        title={income.description}
      >
        {income.description || "-"}
      </td>

      <td className="p-3">

        <div className="flex justify-center gap-3">

          <button onClick={()=> onView(income.id)}
          className="text-green-600 hover:text-green-800">
            <FaEye/>
          </button>

          <button
            onClick={() => onEdit(income)}
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

export default IncomeRow;