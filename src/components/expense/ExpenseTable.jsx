// import Card from "../common/Card";
// import { useGetExpensesQuery } from "../../api/expenseApi";
// import ExpenseRow from "./ExpenseRow";

// import { useState } from "react";


// const ExpenseTable = ({search,category,date,onEdit,}) => {

//      const [currentPage, setCurrentPage] = useState(1);

    
 

//   const {
//     data = [],
//     isLoading,
//     error,
//   } = useGetExpensesQuery();

//   if (isLoading) {
//     return <Card>Loading...</Card>;
//   }

//   if (error) {
//     return <Card>Something went wrong.</Card>;
//   }

//    const filteredExpense = data.filter((item) => {

//   const matchSearch =
//     item.source?.toLowerCase().includes(search.toLowerCase());

//   const matchCategory =
//     category === "All" || item.category === category;
    
//   const matchDate =
//     !date || item.date === date;
//   return matchSearch && matchCategory && matchDate;
// });

// // 2. Pagination

// const itemsPerPage = 5;

// const lastIndex = currentPage * itemsPerPage;

// const firstIndex = lastIndex - itemsPerPage;

// const currentExpense = filteredExpense.slice(firstIndex, lastIndex);

// const totalPages = Math.ceil(filteredExpense.length / itemsPerPage);
//   return (
//     <Card>

//       <table className="w-full">

//         <thead>

//           <tr className="border-b bg-gray-50">

//             <th className="text-left p-3">Date</th>
//             <th className="text-left p-3">Source</th>
//             <th className="text-left p-3">Category</th>
//             <th className="text-right p-3">Amount</th>
//             <th className="text-left p-3">Payment</th>
//             <th className="text-center p-3">Action</th>

//           </tr>

//         </thead>

//         <tbody>

     

//           {currentExpense.map((expense) => (
//             <ExpenseRow
//               key={expense.id}
//               expense={expense}
//               onEdit={onEdit}
//             />
//           ))}

//         </tbody>

//       </table>
//       <div className="flex justify-end items-center gap-2 mt-5">

//         <button 
//         disabled={currentPage === 1}
//         onClick={() => setCurrentPage(currentPage -1)}
//         className="px-3 py-2 border rounded disabled:opacity-50"
//         >
//             Previous
//         </button>

//         <span className="font-medium">
//             {currentPage} / {totalPages}
//         </span>

//         <button 
//         disabled={currentPage === totalPages}
//         onClick={()=> setCurrentPage(currentPage + 1)}
//         className="px-3 py-2 border rounded disabled:opacity-50"
//         >
//             Next
//         </button>
//       </div>

//     </Card>
//   );
// };

// export default ExpenseTable;



import Card from "../common/Card";
import ExpenseRow from "./ExpenseRow";
import { useGetExpensesQuery } from "../../api/expenseApi";
import { useState } from "react";

const ExpenseTable = ({
  search,
  category,
  date,
  onEdit,
  onView,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data = [],
    isLoading,
    error,
  } = useGetExpensesQuery();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error) {
    return <Card>Something went wrong.</Card>;
  }

  const filteredExpense = data.filter((expense) => {
    const matchSearch =
      expense.vendor_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      expense.description
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      expense.bill_number
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      expense.expense_category_id === category;

    const matchDate =
      !date ||
      expense.expense_date === date;

    return (
      matchSearch &&
      matchCategory &&
      matchDate
    );
  });

  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentExpense = filteredExpense.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredExpense.length / itemsPerPage
  );

  return (
    <Card>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-3">
                Expense Date
              </th>

              <th className="text-left p-3">
                Vendor
              </th>

              <th className="text-left p-3">
                Category
              </th>

              <th className="text-right p-3">
                Amount
              </th>

              <th className="text-left p-3">
                Payment
              </th>

              <th className="text-left p-3">
                Bill No
              </th>

              <th className="text-left p-3">
                Description
              </th>

              <th className="text-center p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {currentExpense.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onView={onView}
              />
            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-end items-center gap-2 mt-5">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          {currentPage} / {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="px-3 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </Card>
  );
};

export default ExpenseTable;