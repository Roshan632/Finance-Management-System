



import Card from "../common/Card";

const ExpenseFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  date,
  setDate,
}) => {
  return (
    <Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}

        <input
          type="text"
          placeholder="Search Vendor, Bill No..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="All">All Categories</option>

          <option value="Salary">Salary</option>
          <option value="Bonus">Bonus</option>
          <option value="Allowance">Allowance</option>
          <option value="Freelancer Payment">
            Freelancer Payment
          </option>

          <option value="Rent">Rent</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>

          <option value="Stationery">Stationery</option>
          <option value="Office Supplies">
            Office Supplies
          </option>

          <option value="Furniture">Furniture</option>

          <option value="Maintenance">
            Maintenance
          </option>

          <option value="Cleaning">
            Cleaning
          </option>

          <option value="Hosting">Hosting</option>
          <option value="Domain">Domain</option>
          <option value="SSL">SSL</option>

          <option value="Software Subscription">
            Software Subscription
          </option>

          <option value="API Charges">
            API Charges
          </option>
        </select>

        {/* Payment */}

        <select
          className="border rounded-lg p-3"
        >
          <option>All Payment Methods</option>
          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>Cheque</option>
          <option>eSewa</option>
          <option>Khalti</option>
          <option>Other</option>
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

export default ExpenseFilters;