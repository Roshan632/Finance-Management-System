import { FaPlus } from "react-icons/fa";
import IncomeModal from "./IncomeModal";
import IncomeForm from "./IncomeForm";

const IncomeHeader = ({
  open,
  setOpen,
  selectedIncome,
  setSelectedIncome,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Income Records
          </h1>

          <p className="text-gray-500">
            Manage all income records
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedIncome(null);
            setOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add Income
        </button>

      </div>

      <IncomeModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedIncome(null);
        }}
      >
        <IncomeForm
          selectedIncome={selectedIncome}
          closeModal={() => {
            setOpen(false);
            setSelectedIncome(null);
          }}
        />
      </IncomeModal>
    </>
  );
};

export default IncomeHeader;