// import { FaSearch } from "react-icons/fa";

// const IncomeFilters = ({ search, setSearch, category, setCategory,date,setDate}) => {   //props from incomepage
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//         <div className="relative">

//           <FaSearch
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//   type="text"
//   placeholder="Search by source..."
//   value={search}
//   onChange={(e) => setSearch(e.target.value)}
//   className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
// />
//         </div>

//         <select value={category} onChange={(e) => setCategory(e.target.value)}
//           className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           <option>All Categories</option>
//           <option>Job</option>
//           <option>Freelance</option>
//           <option>Business</option>
//           <option>Investment</option>
//         </select>

//         <input
//           type="date" value={date} onChange={(e) => setDate(e.target.value)}
//           className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />

//       </div>

//     </div>
//   );
// };

// export default IncomeFilters;



import Card from "../common/Card";

const IncomeFilters = ({
  search,
  setSearch,
 category,
  setCategory,
  date,
  setDate,
}) => {
  return (
    <Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Search */}

        <input
          type="text"
          placeholder="Search by Source / Client / Reference"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 w-full"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="All">All Categories</option>

          <option value="Salary">Salary</option>

          <option value="Business">Business</option>

          <option value="Freelancing">Freelancing</option>

          <option value="Investment">Investment</option>

          <option value="Rental">Rental</option>

          <option value="Other">Other</option>

        </select>

        {/* Date */}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg p-3"
        />

      </div>

    </Card>
  );
};

export default IncomeFilters;