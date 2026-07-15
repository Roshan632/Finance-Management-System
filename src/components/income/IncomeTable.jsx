// import Card from "../common/Card";
// import { useGetIncomesQuery } from "../../api/incomeApi";
// import IncomeRow from "./IncomeRow";

// import { useState } from "react";


// const IncomeTable = ({search,category,date,onEdit,}) => {

//      const [currentPage, setCurrentPage] = useState(1);

   
 

//   const {
//     data = [],
//     isLoading,
//     error,
//   } = useGetIncomesQuery();

//   if (isLoading) {
//     return <Card>Loading...</Card>;
//   }

//   if (error) {
//     return <Card>Something went wrong.</Card>;
//   }

//    const filteredIncome = data.filter((item) => {

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

// const currentIncome = filteredIncome.slice(firstIndex, lastIndex);

// const totalPages = Math.ceil(filteredIncome.length / itemsPerPage);
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

     

//           {currentIncome.map((income) => (
//             <IncomeRow
//               key={income.id}
//               income={income}
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

// export default IncomeTable;



import Card from "../common/Card";
import { useGetIncomesQuery } from "../../api/incomeApi";
import IncomeRow from "./IncomeRow";
import { useState } from "react";

const IncomeTable = ({
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
  } = useGetIncomesQuery();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  if (error) {
    return <Card>Something went wrong.</Card>;
  }

  // Filter Data
  const filteredIncome = data.filter((item) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      item.income_source
        ?.toLowerCase()
        .includes(searchText) ||
      item.client_name
        ?.toLowerCase()
        .includes(searchText);

    const matchCategory =
      category === "All" ||
      item.income_category_id === category;

    const matchDate =
      !date ||
      item.transaction_date === date;

    return (
      matchSearch &&
      matchCategory &&
      matchDate
    );
  });

  // Pagination
  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentIncome = filteredIncome.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredIncome.length / itemsPerPage
  );

  return (
    <Card>
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-3">
                Date
              </th>

              <th className="text-left p-3">
                Income Source
              </th>

              <th className="text-left p-3">
                Client
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
                Reference
              </th>

              <th className="text-left p-3">
                Invoice
              </th>

              <th className="text-center p-3">
                Description
              </th>

              <th className="text-center p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {currentIncome.length > 0 ? (
              currentIncome.map((income) => (
                <IncomeRow
                  key={income.id}
                  income={income}
                  onEdit={onEdit}
                  onView={onView}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-8 text-gray-500"
                >
                  No income records found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

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
          {totalPages === 0
            ? 0
            : currentPage}{" "}
          / {totalPages}
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

export default IncomeTable;