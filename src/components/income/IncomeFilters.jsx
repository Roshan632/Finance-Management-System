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