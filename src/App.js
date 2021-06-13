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
      className="w-full flex justify-center items-center py-8"
    >
      <div
        style={{
          width: "380px",
        }}
        className="flex flex-col"
      >
        <h1 className="text-3xl font-medium">Tracker</h1>
        <h2 className="text-lg font-medium mt-6">Balance</h2>
        <Balance balanceData={balanceData} />
        <IncomeExpenseTable transactions={transactions} />

        <div className="mt-8 flex flex-col space-y-4">
          <h2 className="text-lg font-medium pb-1 border-b border-gray-300 ">
            Visualization
          </h2>
          <div className="shadow border border-gray-200 px-4 py-2 rounded">
            <Line data={graphData} />
          </div>
        </div>
        <TransactionList transactions={transactions} />

        <div className="mt-8 flex flex-col space-y-4">
          <h2 className="text-lg font-medium pb-1 border-b border-gray-300 ">
            Add transaction
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <label className="text-xs text-gray-600">Item description</label>
              <input
                {...register("item", { required: true })}
                type="text"
                className="w-full py-2 pl-3 pr-10 transition-colors border-2 border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-indigo-500 mt-1"
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
                className="w-full py-2 pl-3 pr-10 transition-colors border-2 border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-indigo-500 mt-1"
              />
            </div>
            {errors.amount && errors.amount.type === "required" && (
              <p className="mt-2 text-sm text-red-600">Field is required</p>
            )}
            <button
              type="submit"
              className="mt-6 w-full py-2 font-bold text-center text-indigo-500 border-2 border-indigo-500 rounded cursor-pointer hover:bg-indigo-500 hover:text-gray-100 focus:outline-none"
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
