import Card from "../common/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useGetCashflowQuery } from "../../api/cashflowApi";

export default function CashFlowChart() {
  const { data = [] } = useGetCashflowQuery();

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Monthly Cash Flow</h2>

      <div className="h-96">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="income" stroke="#16a34a" strokeWidth={3} />
            <Line dataKey="expense" stroke="#dc2626" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}