import React, { useState } from "react";
import { IoTriangle } from "react-icons/io5";

function ExchangeComponent() {
  const [sellingCurrency, setSellingCurrency] = useState("Btc");
  const [buyingCurrency, setBuyingCurrency] = useState("Eth");
  const [sellList, setSellList] = useState(false);
  const [buyList, setBuyList] = useState(false);
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // List of currencies
  const currencyList = [
    "Btc",
    "Eth",
    "Xrp",
    "Bnb",
    "Dot",
    "Ltc",
    "Usd",
    "Eur",
    "Gbp",
    "Inr",
    "Jpy",
  ];

  // Handler for selecting the currency to sell
  const handleSellCurrency = (e) => {
    setSellingCurrency(e.target.textContent);
    setSellList(false);
  };
  
  // Handler for selecting the currency to buy
  const handleBuyCurrency = (e) => {
    setBuyingCurrency(e.target.textContent);
    setBuyList(false);
  };

  // Handler for the exchange
  const handleExchange = async () => {
    setError(""); // Reset error message

    // Validate the sell amount
    if(isNaN(sellAmount) || sellAmount <= 0) {
        setError("Invalid Number");
        return;
    }

    try {
      setIsLoading(true);
      // Fetching exchange rates
      const response = await fetch(
        `https://api.coingecko.com/api/v3/exchange_rates`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch. Please try again later.');
      }
      const data = await response.json();
      const rates = data.rates;

      // Calculating the conversion rate
      const sellRate = rates[sellingCurrency.toLowerCase()].value;
      const buyRate = rates[buyingCurrency.toLowerCase()].value;
      const conversionRate = buyRate / sellRate;
      const amountConverted = (sellAmount * conversionRate).toFixed(2);
      setBuyAmount(amountConverted); // Setting the converted buy amount
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("Limit exceeded"); // If fetch fails, displaying error
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-4">
      <h1 className="text-xl font-semibold">Exchange Coins</h1>
      <div className="flex gap-4 lg:gap-8 my-6 items-center justify-center sm:justify-normal">
        <h1 className="text-red-600">Sell</h1>
        <div className="w-36 relative">

          {/* Dropdown for selecting the currency to sell  */}
          <button
            onClick={() => setSellList(!sellList)}
            className="w-full bg-gray-200 px-4 py-2 rounded flex justify-between items-center gap-2"
          >
            {sellingCurrency}
            <IoTriangle style={{ transform: "rotate(180deg)" }} />
          </button>
          {sellList && (
            <ul data-testid="sell-currency-list" className="absolute z-20 mt-2 rounded shadow-md bg-gray-300 p-2 max-h-20 overflow-y-auto w-36  custom-scrollbar">
              {currencyList.map((currency) => (
                <li
                  key={currency}
                  onClick={handleSellCurrency}
                  className="p-1 hover:bg-gray-200 cursor-pointer"
                >
                  {currency}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Input for entering the sell amount */}
        <div className="relative w-36">
          <label htmlFor="sell-value" className="block text-sm font-medium text-gray-700 absolute -top-6">
            Enter value
          </label>
          <input id="sell-value"
            onChange={(e) => setSellAmount(e.target.value)}
            className="w-full px-4 py-2 rounded"
          />
          {/* Error message if sell amount is invalid */}
          {error && <small className="absolute block -bottom-6 text-red-500">{error}</small>}
        </div>
      </div>
      <div className="flex gap-4 lg:gap-8 items-center justify-center sm:justify-normal">
        <h1 className="text-green-600">Buy</h1>
        <div className="w-36 relative">
          {/* Dropdown for selecting the currency to buy */}
          <button
            onClick={() => setBuyList(!buyList)}
            className="w-full bg-gray-200 px-4 py-2 rounded flex justify-between items-center gap-2"
          >
            {buyingCurrency}
            <IoTriangle style={{ transform: "rotate(180deg)" }} />
          </button>
          {buyList && (
            <ul data-testid="buy-currency-list" className="absolute z-10 mt-2 rounded shadow-md bg-gray-300 p-2 max-h-20 overflow-y-auto w-36 custom-scrollbar">
              {currencyList.map((currency) => (
                <li
                  key={currency}
                  onClick={handleBuyCurrency}
                  className="p-1 hover:bg-gray-200 cursor-pointer"
                >
                  {currency}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Display the converted buy amount */}
        {isLoading ? (
          <div className="w-36 flex justify-center items-center">
          <div className="spinner"></div>
        </div>
        ) : (
          <div className="w-36 text-center text-green-600">{buyAmount}</div>
        )}
      </div>
      {/* Button to initiate the exchange */}
      <div className="mt-6 flex justify-center">
        <button
          className="bg-blue-600 px-4 py-2 rounded-md text-gray-200"
          onClick={handleExchange}
        >
          Exchange
        </button>
      </div>
    </div>
  );
}

export default ExchangeComponent;