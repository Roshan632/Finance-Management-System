


export let incomes = [
  {
    id: "1",
    transaction_date: "2026-07-15",
    amount: 50000,
    income_category_id: "Salary",
    income_source: "ABC Company",
    client_name: "ABC Pvt. Ltd.",
    payment_method: "Bank Transfer",
    reference_number: "REF1001",
    invoice_number: "INV1001",
    description: "Monthly salary",
    attachments:[{
      id:"att1",
      fileName:"invoice.pdf",
      fileSize:145600,
      fileType:"application/pdf",
    },],
  },

  {
    id: "2",
    transaction_date: "2026-07-12",
    amount: 15000,
    income_category_id: "Freelancing",
    income_source: "Fiverr",
    client_name: "John Smith",
    payment_method: "eSewa",
    reference_number: "REF1002",
    invoice_number: "INV1002",
    description: "Website Development",
    attachments:[{
      id:"att2",
      fileName:"bill.png",
      fileSize:98765,
      fileType:"image/png",

    },],
  },

  {
    id: "3",
    transaction_date: "2026-07-09",
    amount: 22000,
    income_category_id: "Business",
    income_source: "Shop",
    client_name: "Local Customer",
    payment_method: "Cash",
    reference_number: "REF1003",
    invoice_number: "INV1003",
    description: "Product Sales",
    attachments:[],
  },
];