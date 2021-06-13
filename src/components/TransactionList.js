import React from "react";

export default function TransactionList({ transactions }) {
  return (
    <div className="mt-8 flex flex-col space-y-4">
      <h2 className="text-lg font-medium pb-1 border-b border-gray-300 ">
        History
      </h2>
      {transactions.map((transaction, i) => (
        <div
          key={i}
          className="flex flex-row justify-between shadow border border-gray-200 pl-4 pr-2 py-2 text-sm rounded"
        >
          <div>{transaction.item}</div>
          {transaction.amount >= 0 ? (
            <div className="font-medium text-green-500">
              {`+$ ${transaction.amount}`}
            </div>
          ) : (
            <div className="font-medium text-red-600">
              {`-$ ${Math.abs(transaction.amount)}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
