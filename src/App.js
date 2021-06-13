import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import Balance from "./components/Balance";
import IncomeExpenseTable from "./components/IncomeExpenseTable";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balanceData, setBalanceData] = useState([0]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { item, amount } = data;
    setTransactions([
      ...transactions,
      {
        item,
        amount: parseInt(amount),
      },
    ]);
    reset({
      item: null,
      amount: null,
    });
  };

  // local storage save and get data
  useEffect(() => {
    if (transactions.length === 0 && balanceData.length === 1) {
      const transactions = JSON.parse(localStorage.getItem("transactions"));
      const balanceData = JSON.parse(localStorage.getItem("balanceData"));
      setTransactions(transactions);
      setBalanceData(balanceData);
    }
  }, [balanceData.length, transactions.length]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("balanceData", JSON.stringify(balanceData));
  }, [balanceData]);

  useEffect(() => {
    const amounts = transactions.map((transaction) => transaction.amount);
    const balanceData = [0];
    let i;
    for (i = 0; i < amounts.length; i++) {
      const balance = amounts
        .slice(0, i + 1)
        .reduce((acc, item) => (acc += item), 0);
      balanceData.push(balance);
    }
    setBalanceData(balanceData);
  }, [transactions]);

  const labels = balanceData.map((data) => "");
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "Balance",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(99, 102, 241,1)",
        borderColor: "rgba(0,0,0,0.7)",
        borderWidth: 2,
        data: balanceData,
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="flex items-center justify-center w-full py-8"
    >
      <div
        style={{
          width: "380px",
        }}
        className="flex flex-col"
      >
        <h1 className="text-3xl font-medium">Tracker</h1>
        <h2 className="mt-6 text-lg font-medium">Balance</h2>
        <Balance balanceData={balanceData} />
        <IncomeExpenseTable transactions={transactions} />

        <div className="flex flex-col mt-8 space-y-4">
          <h2 className="pb-1 text-lg font-medium border-b border-gray-300 ">
            Visualization
          </h2>
          <div className="px-4 py-2 border border-gray-200 rounded shadow">
            <Line data={graphData} />
          </div>
        </div>
        <TransactionList transactions={transactions} />

        <div className="flex flex-col mt-8 space-y-4">
          <h2 className="pb-1 text-lg font-medium border-b border-gray-300 ">
            Add transaction
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <label className="text-xs text-gray-600">Item description</label>
              <input
                {...register("item", { required: true })}
                type="text"
                className="w-full py-2 pl-3 pr-10 mt-1 transition-colors border-2 border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
            {errors.item && errors.item.type === "required" && (
              <p className="mt-2 text-sm text-red-600">Field is required</p>
            )}
            <div className="relative mt-2">
              <label className="text-xs text-gray-600">
                Amount (input positive for income, negative for expense)
              </label>
              <input
                {...register("amount", { required: true })}
                type="number"
                className="w-full py-2 pl-3 pr-10 mt-1 transition-colors border-2 border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
            {errors.amount && errors.amount.type === "required" && (
              <p className="mt-2 text-sm text-red-600">Field is required</p>
            )}
            <button
              type="submit"
              className="w-full py-2 mt-6 font-bold text-center text-indigo-500 border-2 border-indigo-500 rounded cursor-pointer hover:bg-indigo-500 hover:text-gray-100 focus:outline-none"
            >
              Add transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
