

import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportCards from '../../components/reports/ReportCards';
import { useGetReportsQuery } from '../../api/reportApi';
import IncomeExpenseChart from '../../components/charts/IncomeExpenseChart';

const ReportsPage = () => {

    const {data=[],isLoading,}=useGetReportsQuery();
    console.log(data);

    if (isLoading){
        return <p>Loading...</p>;
    }

    const totalIncome= data.reduce((sum,item)=>sum + item.income,0);

    const totalExpense= data.reduce((sum,item)=>sum + item.expense,0);

  return (
    <DashboardLayout>

        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Reports</h1>

            <ReportCards income={totalIncome}
            expense={totalExpense}/>

            <IncomeExpenseChart data={data}/>
            </div>
        </DashboardLayout>
  )
}

export default ReportsPage