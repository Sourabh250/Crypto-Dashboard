import React, { useEffect, useState } from "react";
import { IoTriangle } from "react-icons/io5";
import { useSelector } from "react-redux";
import numeral from "numeral";

function MarketCapComponent() {
  const [coinState, setCoinState] = useState({ coins: [], symbol: "$" });
  const [isLoading, setIsLoading] = useState(false);
  const reduxData = useSelector((state) => state.currency).toLowerCase();

  // Function to get currency symbol
  const getSymbol = (data) => {
    const Symbols = {
      usd: "$",
      inr: "₹",
      eur: "€",
      jpy: "¥",
      gbp: "£",
    };
    return Symbols[data];
  };

  // Fetch cryptocurrency data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const apiKey = "CG-7TzT57ZLhugEtsmWZnyA8d1H";
      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${reduxData}&order=market_cap_desc&page=1&price_change_percentage=24h&x_cg_demo_api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch. Please try again later.");
        }
        const data = await response.json();
        setCoinState({ coins: data, symbol: getSymbol(reduxData) });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [reduxData]);

  // Function to format market cap
  const formatMcap = (value) => {
    return numeral(value).format("0.0a").toUpperCase();
  };

  // Render the component
  return (
    <div className="bg-gray-100 h-full w-full md:w-1/4 rounded-lg shadow-lg py-3 lg:py-6">
      <h1 className="text-lg lg:text-xl font-semibold px-4">
        Cryptocurrency by
        <br />
        market cap
      </h1>

        {/* Loading spinner or list of cryptocurrencies */}
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
          <div className="spinner"></div>
        </div>
        ) : (
          <div className="flex flex-col text-sm">
            {coinState.coins.slice(0, 7).map((data, index) => (
              <div
                className="flex justify-between items-center px-4 py-3 lg:py-6 border-b"
                key={index}
              >
                <div>
                  <h1 className="font-medium">{data.name}</h1>
                  <h2 className="font-extralight">
                    M.Cap {coinState.symbol}
                    {formatMcap(data.market_cap)}
                  </h2>
                </div>
                <div className="flex justify-center items-center gap-1">

                  {/* Display price change percentage with arrow */}
                  {data.price_change_percentage_24h > 0 ? (
                    <IoTriangle color="green" />
                  ) : (
                    <IoTriangle
                      color="red"
                      style={{ transform: "rotate(180deg)" }}
                    />
                  )}
                  {Math.abs(data.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default MarketCapComponent;
