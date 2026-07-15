


import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import KPIGrid from "../components/dashboard/KPIGrid";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import IncomeCategoryChart from "../components/charts/IncomeCategoryChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";
import CashFlowChart from "../components/charts/CashFlowChart";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import ReminderWidget from "../components/dashboard/ReminderWidget";

const Dashboard = () => {
  return (
    <DashboardLayout>

  <DashboardHeader />

  <KPIGrid />

  

<div className="mt-8">

    <IncomeExpenseChart/>

</div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      <IncomeCategoryChart />

      <ExpenseCategoryChart />

  </div>

  <CashFlowChart />

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      <TransactionsTable />

      <ReminderWidget />

  </div>

</DashboardLayout>
  );
};

export default Dashboard;