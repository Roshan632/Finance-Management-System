

const ReportCards = ({ income, expense }) => {

  const profit = income - expense;

  return (

    <div className="grid md:grid-cols-3 gap-5">

      <div className="bg-white rounded-xl shadow p-6">

        <p>Total Income</p>

        <h2 className="text-3xl font-bold text-green-600">

          Rs.

          
            {income.toLocaleString()}
          

        </h2>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <p>Total Expense</p>

        <h2 className="text-3xl font-bold text-red-600">

          Rs.

          {expense.toLocaleString()}

        </h2>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <p>Profit</p>

        <h2 className="text-3xl font-bold text-blue-600">

          Rs.

          {profit.toLocaleString()}

        </h2>

      </div>

    </div>

  );
};

export default ReportCards;