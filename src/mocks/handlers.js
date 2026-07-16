import { http, HttpResponse } from "msw";

import { dashboard } from "./data/dashboard";
import { incomeExpense } from "./data/incomeExpense";
import { incomeCategory } from "./data/incomeCategory";
import { expenseCategory } from "./data/expenseCategory";
import { cashflow } from "./data/cashflow";
import { transactions } from "./data/transactions";

import { incomes } from "./data/incomes";
import { expenses } from "./data/expenses";
import { reports } from "./data/reports";
import {notes} from "./data/notes";
import {reminders} from "./data/reminders";

export const handlers = [

  http.get("/api/dashboard", () => HttpResponse.json(dashboard)),

  http.get("/api/income-expense", () => HttpResponse.json(incomeExpense)),

  http.get("/api/income-category", () => HttpResponse.json(incomeCategory)),

  http.get("/api/expense-category", () => HttpResponse.json(expenseCategory)),

  http.get("/api/cashflow", () => HttpResponse.json(cashflow)),

  http.get("/api/transactions", () => HttpResponse.json(transactions)),

  http.get("/api/reminders", () => HttpResponse.json(reminders)),

  //incomes APIs
  http.get("/api/incomes", () => HttpResponse.json(incomes)),
 http.get("/api/incomes/:id", ({ params }) => {

  const income = incomes.find(
    (item) => item.id === params.id
  );

  if (!income) {
    return HttpResponse.json(
      { message: "Income not found" },
      { status: 404 }
    );
  }

  return HttpResponse.json(income);

}),
  http.post("/api/incomes", async ({ request }) => {
  const body = await request.json();

  const newIncome = {
    id: Date.now().toString(),
    ...body,
  };

  incomes.unshift(newIncome);

  return HttpResponse.json(newIncome, { status: 201 });
}),

http.put("/api/incomes/:id", async ({ params, request }) => {
  const body = await request.json();

  const index = incomes.findIndex(
    (item) => item.id === params.id
  );

 if (index === -1) {
  return HttpResponse.json(
    { message: "Income not found" },
    { status: 404 }
  );
}

incomes[index] = {
  ...incomes[index],
  ...body,
};

return HttpResponse.json(incomes[index]);
}),

http.delete("/api/incomes/:id", ({ params }) => {
  const index = incomes.findIndex(
    (item) => item.id === params.id
  );

  if (index !== -1) {
    incomes.splice(index, 1);
  }

  return HttpResponse.json({
    success: true,
  });
}),

//expenses

http.get("/api/expenses", () => {
  return HttpResponse.json(expenses);
}),


  http.post("/api/expenses", async ({ request }) => {
  const body = await request.json();

  const newExpense = {
    id: Date.now().toString(),
    ...body,
  };

  expenses.unshift(newExpense);

  return HttpResponse.json(newExpense, { status: 201 });
}),

http.get("/api/expenses/:id", ({ params }) => {

  const expense = expenses.find(
    (item) => item.id === params.id
  );

  if (!expense) {

    return HttpResponse.json(
      { message: "Expense not found" },
      { status: 404 }
    );

  }

  return HttpResponse.json(expense);

}),

//ATTACHMENTS ->

http.post("/api/expenses/:id/attachments",async ({params,request})=>{
  const body=await request.json();
  const expense = expenses.find(
    item=>item.id === params.id
  );
  
  if(!expense){
    return HttpResponse.json(
      {message:"Expense not found"},
      {status:404}

    );
  }
  expense.attachments=[
    ...(expense.attachments || []),
    ...body.attachments,
  ];
  return HttpResponse.json(expense)
}),

http.delete(
  "/api/expenses/:expenseId/attachments/:attachmentId",
  ({ params }) => {

    const expense = expenses.find(
      item => item.id === params.expenseId
    );

    if (!expense) {
      return HttpResponse.json(
        { message: "Expense not found" },
        { status: 404 }
      );
    }

    expense.attachments = expense.attachments.filter(
      file => file.id !== params.attachmentId
    );

    return HttpResponse.json({
      message: "Attachment removed",
    });

  }
),


http.put("/api/expenses/:id", async ({ params, request }) => {
  const body = await request.json();

   const index = expenses.findIndex(
    (item) => item.id === params.id
  );

  if (index === -1) {
  return HttpResponse.json(
    { message: "Expense not found" },
    { status: 404 }
  );
}

expenses[index] = {
  ...expenses[index],
  ...body,
};

return HttpResponse.json(expenses[index]);
}),

http.delete("/api/expenses/:id", ({ params }) => {
  const index = expenses.findIndex(
    (item) => item.id === params.id
  );

  if (index !== -1) {
    expenses.splice(index, 1);
  }

  return HttpResponse.json({
    message: "Expense deleted successfully",
  });
}),

http.get("/api/reports", () => {
  return HttpResponse.json(reports);
}),

http.get("/api/expenses/export", ({ request }) => {
  const url = new URL(request.url);

  const format = url.searchParams.get("format");

  const content = `Expense Report\n\nGenerated from Finance Management System`;

  return new HttpResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename=expenses.${format}`,
    },
  });
}),

//ATTACHMENTS-> INCOMES
http.post("/api/incomes/:id/attachments", async ({ params, request }) => {

  const body = await request.json();

  const income = incomes.find(
    (item) => item.id === params.id
  );

  if (!income) {
    return HttpResponse.json(
      { message: "Income not found" },
      { status: 404 }
    );
  }

  income.attachments = [
    ...(income.attachments || []),
    ...body,
  ];

  return HttpResponse.json(income.attachments);

}),

http.delete(
  "/api/incomes/:id/attachments/:attachmentId",
  ({ params }) => {

    const income = incomes.find(
      (item) => item.id === params.id
    );

    if (!income) {
      return HttpResponse.json(
        { message: "Income not found" },
        { status: 404 }
      );
    }

    income.attachments =
      (income.attachments || []).filter(
        (file) => file.id !== params.attachmentId
      );

    return HttpResponse.json({
      message: "Attachment removed successfully",
    });
  }
),

http.get("/api/incomes/export", ({ request }) => {

  const url = new URL(request.url);

  const format =
    url.searchParams.get("format") || "pdf";

  const content =
    "Income Report\nGenerated by Finance Management System";

  return new HttpResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition":
        `attachment; filename=incomes.${format}`,
    },
  });

}),

//NOTES MODULE APIS

http.get("/api/notes", () => {
  return HttpResponse.json(
    notes.filter((note) => note.deleted_at === null)
  );
}),

http.post("/api/notes", async ({ request }) => {

  const body = await request.json();

  const newNote = {
    id: Date.now().toString(),

    is_pinned: false,

    is_archived: false,

    created_at: new Date().toISOString(),

    updated_at: new Date().toISOString(),

    deleted_at: null,

    ...body,
  };

  notes.unshift(newNote);

  return HttpResponse.json(newNote, {
    status: 201,
  });

}),

http.get("/api/notes/:id", ({ params }) => {

  const note = notes.find(
    (item) => item.id === params.id && item.deleted_at === null
  );

  if (!note) {
    return HttpResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  return HttpResponse.json(note);

}),

http.patch("/api/notes/:id", async ({ params, request }) => {

  const body = await request.json();

  const index = notes.findIndex(
    (item) => item.id === params.id
  );

  if (index === -1) {
    return HttpResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  notes[index] = {
    ...notes[index],
    ...body,
    updated_at: new Date().toISOString(),
  };

  return HttpResponse.json(notes[index]);

}),

http.delete("/api/notes/:id", ({ params }) => {

  const note = notes.find(
    (item) => item.id === params.id
  );

  if (!note) {
    return HttpResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  note.deleted_at = new Date().toISOString();

  return HttpResponse.json({
    message: "Note deleted successfully",
  });

}),

http.patch("/api/notes/:id/pin", ({ params }) => {

  const note = notes.find(
    (item) => item.id === params.id
  );

  if (!note) {
    return HttpResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  note.is_pinned = !note.is_pinned;
 note.updated_at = new Date().toISOString();

  return HttpResponse.json(note);

}),
http.patch("/api/notes/:id/archive", ({ params }) => {

  const note = notes.find(
    (item) => item.id === params.id
  );

  if (!note) {
    return HttpResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  note.is_archived = !note.is_archived;
  note.updated_at = new Date().toISOString();
  return HttpResponse.json(note);

}),

// Reminder Module APIS
http.get("/api/reminders",()=>{
  return HttpResponse.json(
    reminders.filter(
      (item)=> item.deleted_at === null

    )
  );
}),

http.get("/api/reminders/:id",({params})=>{
  const reminder = reminders.find(
    (item) => item.id ===params.id
  );

  if (!reminder){
    return HttpResponse.json(
      {message:"Reminder not found"},
      {status:404}
    );
  }
  return HttpResponse.json(reminder);
}),

http.post("/api/reminders",async ({request})=>{
  const body = await request.json();
  const reminder={
    id:Date.now().toString(),
    status:"PENDING",
    attachments:[],
    created_by:"user1",
    created_at:new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at:null,
    ...body,
  };
  reminders.unshift(reminder);
  return HttpResponse.json(reminder,{
    status:201,
  });
}),

http.patch("/api/reminders/:id",async ({params,request})=>{
  const body=await request.json();
  const index=reminders.findIndex(
    (item)=> item.id === params.id
  );

  if(index === -1){
    return HttpResponse.json(
      {message:"Reminder not found"},
      {status:404}
    );
  }
  reminders[index]={
    ...reminders[index],
    ...body,
    updated_at:new Date().toISOString(),
  };
  return HttpResponse.json(reminders[index]);
}),

http.delete("/api/reminders/:id",({params})=>{
  const reminder = reminders.find(
    (item)=> item.id === params.id
  );

  if (!reminder){
    return HttpResponse.json(
      {message:"Reminder not found"},
      {status:404}
    );
  }
  reminder.deleted_at = new Date().toISOString();
  return HttpResponse.json({
    message:"Reminder deleted successfully",
  });
}),

http.patch("/api/reminders/:id/complete",({params})=>{
  const reminder = reminders.find(
    (item)=> item.id === params.id
  );
  if(!reminder){
    return HttpResponse.json(
      {message:"Reminder not found"},
      {status:404}
    );
  }
  reminder.status = "COMPLETED";
  reminder.updated_at = new Date().toISOString();
  return HttpResponse.json(reminder);
}),

http.post("/api/reminders/:id/attachments",async ({params,request})=>{
  const reminder= reminders.find(
    (item)=> item.id === params.id
  );
  if(!reminder){
    return HttpResponse.json(
      {message:"Reminder not found"},
      {status:404}
    );
  }
  const body = await request.json();
  reminder.attachments.push({
    id:crypto.randomUUID(),
    ...body,
  });
  return HttpResponse.json(reminder);
}),

http.delete("/api/reminders/:id/attachments/:attachmentid",({params})=>{
  const reminder = reminders.find(
    (item)=> item.id === params.id
  );
  if(!reminder){
    return HttpResponse.json(
      {message:"Reminder not found"},
      {status:404}
    );
  }
  reminder.attachments = reminder.attachments.filter(
    (file)=> file.id!== params.attachmentId
  );
  return HttpResponse.json(reminder);
}),


];


//This is a mock service worker handlers file that defines various API endpoints and their corresponding mock responses. It uses the `msw` library to intercept network requests and return predefined data for testing and development purposes. The handlers cover endpoints for dashboard data, income and expense categories, cash flow, transactions, reminders, incomes, expenses, and reports. Each handler specifies the HTTP method (GET, POST, PUT, DELETE) and the response to be returned when the endpoint is called.