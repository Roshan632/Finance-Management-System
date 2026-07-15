import { useGetExpenseByIdQuery } from "../../api/expenseApi";

const ExpenseDetails = ({ id }) => {

    const {
        data: expense,
        isLoading,
    } = useGetExpenseByIdQuery(id);

    if (isLoading)
        return <p>Loading...</p>;

    return (
        <div className="space-y-3">

            <h2 className="text-2xl font-bold">
                Expense Details
            </h2>

            <p>
                <strong>Date:</strong> {expense.expense_date}
            </p>

            <p>
                <strong>Vendor:</strong> {expense.vendor_name}
            </p>

            <p>
                <strong>Category:</strong> {expense.expense_category_id}
            </p>

            <p>
                <strong>Payment:</strong> {expense.payment_method}
            </p>

            <p>
                <strong>Amount:</strong> Rs. {expense.amount}
            </p>

            <p>
                <strong>Description:</strong> {expense.description}
            </p>

            <div>

                <h3 className="font-semibold">
                    Attachments
                </h3>

                {expense.attachments?.length ? (

                    expense.attachments.map(file => (

                        <div key={file.id}>
                            📎 {file.fileName}
                        </div>

                    ))

                ) : (

                    <p>No Attachments</p>

                )}

            </div>

        </div>
    );
};

export default ExpenseDetails;