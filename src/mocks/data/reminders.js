export let reminders = [
  {
    id: "1",
    title: "Pay Office Rent",
    description: "Pay office rent before due date.",

    reminder_date: "2026-07-20",
    reminder_time: "10:00",

    priority: "HIGH",
    status: "PENDING",
    repeat: "MONTHLY",

    attachments: [
      {
        id: "att1",
        fileName: "rent_invoice.pdf",
        fileSize: 145600,
        fileType: "application/pdf",
      },
    ],

    created_by: "user1",

    created_at: "2026-07-15T09:00:00Z",
    updated_at: "2026-07-15T09:00:00Z",
    deleted_at: null,
  },

  {
    id: "2",
    title: "Renew Domain",

    description: "Renew company domain before expiry.",

    reminder_date: "2026-07-22",

    reminder_time: "14:30",

    priority: "MEDIUM",

    status: "PENDING",

    repeat: "YEARLY",

    attachments: [],

    created_by: "user1",

    created_at: "2026-07-14T08:00:00Z",

    updated_at: "2026-07-14T08:00:00Z",

    deleted_at: null,
  },

  {
    id: "3",

    title: "Employee Salary",

    description: "Transfer salaries to all employees.",

    reminder_date: "2026-07-30",

    reminder_time: "09:00",

    priority: "HIGH",

    status: "COMPLETED",

    repeat: "MONTHLY",

    attachments: [
      {
        id: "att2",

        fileName: "salary_sheet.xlsx",

        fileSize: 225000,

        fileType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],

    created_by: "user1",

    created_at: "2026-07-10T09:00:00Z",

    updated_at: "2026-07-12T12:00:00Z",

    deleted_at: null,
  },
];