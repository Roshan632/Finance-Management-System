import Card from "../common/Card";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useGetExpenseCategoryQuery } from "../../api/expenseCategoryApi";
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

export default function ExpenseCategoryChart() {
  const { data = [] } = useGetExpenseCategoryQuery();
  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Expense Categories</h2>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={110}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}