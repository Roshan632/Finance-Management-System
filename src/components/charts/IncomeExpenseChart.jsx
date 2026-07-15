import Card from "../common/Card";
import { useGetIncomeExpenseQuery } from "../../api/incomeExpenseApi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

const IncomeExpenseChart = () => {
  const { data = [], isLoading } = useGetIncomeExpenseQuery();

  if (isLoading) {
    return (
      <Card>
        Loading Chart...
      </Card>
    );
  }

  return (
    <Card>

      <div className="mb-5">

        <h2 className="text-xl font-bold">
          Income vs Expense
        </h2>

        <p className="text-sm text-gray-500">
          Daily • Weekly • Monthly • Yearly
        </p>

      </div>

      <div className="h-95">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="period" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="income"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="expense"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="profit"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
};

export default IncomeExpenseChart;