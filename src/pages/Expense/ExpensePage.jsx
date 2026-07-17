import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ExpenseHeader from "../../components/expense/ExpenseHeader";
import ExpenseFilters from "../../components/expense/ExpenseFilters";
import ExpenseTable from "../../components/expense/ExpenseTable";
import ExpenseModal from "../../components/expense/ExpenseModal";
import ExpenseDetails from "../../components/expense/ExpenseDetails";

const ExpensePage = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [open, setOpen] = useState(false);
 const [viewExpenseId,setViewExpenseId] = useState(null);
 const [viewOpen,setViewOpen] = useState(false);
  return (
    <DashboardLayout>

      <div className="space-y-6">

        <ExpenseHeader open={open} setOpen={setOpen} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense}/>

        <ExpenseFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
       
        />

        <ExpenseTable
          search={search}
          category={category}
          date={date}
          paymentMethod={paymentMethod}
          
          onEdit={(expense)=>{
            setSelectedExpense(expense);
            setOpen(true);
          }}
          onView={(id)=>{
            setViewExpenseId(id);
            setViewOpen(true);
          }}
        />

        <ExpenseModal 
        open={viewOpen}
        onClose={()=>{
          setViewOpen(false);
          setViewExpenseId(null);
        }}
        >
          <ExpenseDetails id={viewExpenseId}/>
        </ExpenseModal>

      </div>

    </DashboardLayout>
  );
};

export default ExpensePage;