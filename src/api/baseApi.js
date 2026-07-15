import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  tagTypes: [
    "Dashboard",
    "Income",
    "Expense",
    "Note",
    
    "Transactions",
    "Reminders",
    "IncomeCategory",
    "ExpenseCategory",
    "Cashflow",
  ],

  endpoints: () => ({}),
});