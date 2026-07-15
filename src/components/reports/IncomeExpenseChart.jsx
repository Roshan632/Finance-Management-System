import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const IncomeExpenseChart = ({ data }) => {

  return (

    <ResponsiveContainer
      width="100%"
      height={350}
    >

      <BarChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="income"
          fill="#16a34a"
        />

        <Bar
          dataKey="expense"
          fill="#ef4444"
        />

      </BarChart>

    </ResponsiveContainer>

  );

};

export default IncomeExpenseChart;