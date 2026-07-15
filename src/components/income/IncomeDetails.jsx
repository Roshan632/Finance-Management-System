import { useGetIncomeByIdQuery } from "../../api/incomeApi";

const IncomeDetails = ({ id }) => {

  const { data: income, isLoading } =
    useGetIncomeByIdQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!income) {
    return <p>Income not found.</p>;
  }

  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-bold">
        Income Details
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <strong>Date</strong>
          <p>{income.transaction_date}</p>
        </div>

        <div>
          <strong>Amount</strong>
          <p>Rs. {Number(income.amount).toLocaleString()}</p>
        </div>

        <div>
          <strong>Category</strong>
          <p>{income.income_category_id}</p>
        </div>

        <div>
          <strong>Source</strong>
          <p>{income.income_source}</p>
        </div>

        <div>
          <strong>Client</strong>
          <p>{income.client_name}</p>
        </div>

        <div>
          <strong>Payment</strong>
          <p>{income.payment_method}</p>
        </div>

        <div>
          <strong>Reference</strong>
          <p>{income.reference_number}</p>
        </div>

        <div>
          <strong>Invoice</strong>
          <p>{income.invoice_number}</p>
        </div>

      </div>

      <div>

        <strong>Description</strong>

        <p>{income.description || "-"}</p>

      </div>

      <div>

        <h3 className="font-semibold mb-2">
          Attachments
        </h3>

        {income.attachments?.length ? (

          income.attachments.map(file => (

            <div
              key={file.id}
              className="border rounded-lg p-3 mb-2"
            >
              <p>{file.fileName}</p>

              <p className="text-sm text-gray-500">
                {(file.fileSize / 1024).toFixed(2)} KB
              </p>
            </div>

          ))

        ) : (

          <p>No attachments available.</p>

        )}

      </div>

    </div>
  );
};

export default IncomeDetails;