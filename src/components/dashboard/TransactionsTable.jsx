import Card from "../common/Card";
import { useGetTransactionsQuery } from "../../api/transactionApi";

const TransactionsTable = () => {
  const { data = [], isLoading, error } = useGetTransactionsQuery();

  if (isLoading) {
    return (
      <Card>
        <p className="text-gray-500">Loading transactions...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-red-500">Failed to load transactions.</p>
      </Card>
    );
  }

  return (
    <Card>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">
          Recent Transactions
        </h2>

        <button className="text-sm text-green-600 hover:underline">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-3">Date</th>

              <th className="text-left p-3">Title</th>

              <th className="text-left p-3">Category</th>

              <th className="text-left p-3">Type</th>

              <th className="text-right p-3">Amount</th>

              <th className="text-left p-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {data.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-3">{item.date}</td>

                <td className="p-3 font-medium">
                  {item.title}
                </td>

                <td className="p-3">
                  {item.category}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === "Income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.type}
                  </span>

                </td>

                <td
                  className={`p-3 text-right font-bold ${
                    item.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Rs. {item.amount.toLocaleString()}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Card>
  );
};

export default TransactionsTable;