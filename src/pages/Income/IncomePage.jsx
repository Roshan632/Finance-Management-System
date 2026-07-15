import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import IncomeHeader from "../../components/income/IncomeHeader";
import IncomeFilters from "../../components/income/IncomeFilters";
import IncomeTable from "../../components/income/IncomeTable";
import IncomeModal from "../../components/income/IncomeModal";
import IncomeDetails from "../../components/income/IncomeDetails";

const IncomePage = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("");

  const [selectedIncome, setSelectedIncome] = useState(null);
  const [open, setOpen] = useState(false);
 
const [viewIncomeId,setViewIncomeId] = useState(null);
const [viewOpen,setViewOpen] = useState(false);

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <IncomeHeader
          open={open}
          setOpen={setOpen}
          selectedIncome={selectedIncome}
          setSelectedIncome={setSelectedIncome}
        />

        <IncomeFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
        />

        <IncomeTable
          search={search}
          category={category}
          date={date}
          onEdit={(income) => {
            setSelectedIncome(income);
            setOpen(true);
          }}
          onView={(id)=>{
            setViewIncomeId(id);
            setViewOpen(true);
          }}
        />
        <IncomeModal open={viewOpen}
        onClose={()=>{
          setViewOpen(false);
          setViewIncomeId(null);
        }}>
          <IncomeDetails id={viewIncomeId}/>
        </IncomeModal>

      </div>

    </DashboardLayout>
  );
};

export default IncomePage;