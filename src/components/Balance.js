const Balance = ({ balanceData }) => {
  const balance = balanceData[balanceData.length - 1];
  return (
    <>
      <h3 className="text-2xl font-medium">
        {balance >= 0 ? `$ ${balance}` : `-$ ${Math.abs(balance)}`}
      </h3>
    </>
  );
};

export default Balance;
