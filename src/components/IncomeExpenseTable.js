import React from "react";

export default function IncomeExpenseTable({ transactions }) {
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  return (
    <div className="font-medium rounded mt-4 shadow border border-gray-300 flex flex-row divide-x divide-gray-300">
      <div className="w-1/2 text-center py-8">
        <h3>Income</h3>
        <div className="text-green-600">$ {income}</div>
      </div>
      <div className="w-1/2 text-center py-8">
        <h3>Expense</h3>
        <div className="text-red-600">$ {expense}</div>
      </div>
    </div>
  );
}
