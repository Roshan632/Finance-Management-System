export let expenses = [
  {
    id: "1",
    expense_date: "2026-07-14",
    amount: 3500,
    expense_category_id: "Electricity",
    vendor_name: "Nepal Electricity Authority",
    payment_method: "Bank Transfer",
    bill_number: "BILL1001",
    description: "Office electricity bill",
    attachments:[
      {
        id:"att1",
        fileName:"bill.pdf",
        fileSize:245000,
        fileType:"application/pdf",
      },
    ],
  },
  {
    id: "2",
    expense_date: "2026-07-13",
    amount: 1800,
    expense_category_id: "Internet",
    vendor_name: "WorldLink",
    payment_method: "eSewa",
    bill_number: "BILL1002",
    description: "Monthly internet payment",
    attachments:[
      {
        id:"att2",
        fileName:"receipt.jpg",
        fileSize:150000,
        fileType:"image/jpeg",
      },
    ],
  },
  {
    id: "3",
    expense_date: "2026-07-11",
    amount: 1200,
    expense_category_id: "Stationery",
    vendor_name: "ABC Stationery",
    payment_method: "Cash",
    bill_number: "BILL1003",
    description: "Office stationery purchase",
    attachments: [],
  },
];