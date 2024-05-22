import React, { useState, useEffect, useCallback } from "react";
import LineChart from "../charts/LineChart";
import BarChartVertical from "../charts/BarChartVertical";
import BarChartHorizontal from "../charts/BarChartHorizontal";
import { useDispatch, useSelector } from "react-redux";
import { IoTriangle } from "react-icons/io5";
import { debounce } from "lodash";

function GraphComponent() {
  const dispatcher = useDispatch();
  const reduxCurrency = useSelector((state) => state.currency).toLowerCase();
  const reduxSelectedCurrencies = useSelector(
    (state) => state.selectedCurrencies
  );
  const [timeFrame, setTimeFrame] = useState("1W");
  const [showCurrency, setShowCurrency] = useState(false);
  const [chartType, setChartType] = useState("Line");
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [cryptoCurrencyList, setCryptoCurrencyList] = useState([
    "Bitcoin",
    "Tether",
    "Ethereum",
    "Ripple",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search handler
  const handleSearchChange = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 800),
    []
  );

  // Fetches the cryptocurrency list
  useEffect(() => {
    const fetchList = async () => {
      const apiKey = "CG-7TzT57ZLhugEtsmWZnyA8d1H";
      try {
        const url = `https://api.coingecko.com/api/v3/coins/list?include_platform=false&x_cg_demo_api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response) {
          throw new Error("Failed to fetch cryptocurrency list.");
        }
        const data = await response.json();
        setCryptoCurrencyList(
          data.map((coin) => coin.id.charAt(0).toUpperCase() + coin.id.slice(1))
        );
      } catch (error) {
        console.error("Failed to fetch cryptocurrency list.", error);
      }
    };
    fetchList();
  }, []);

  // Fetches historical data for selected currencies
  const fetchHistoricalData = async () => {
    if (reduxSelectedCurrencies.length) {
      setIsLoading(true);
    }

    // Determine number of days based on selected time frame
    let days = "365";
    let formattedDataArray = [];
    const apiKey = "CG-7TzT57ZLhugEtsmWZnyA8d1H";
    if (timeFrame === "1D") {
      days = "14";
    } else if (timeFrame === "1W") {
      days = "120";
    } else if (timeFrame === "1M") {
      days = "360";
    }

    // Fetching data for each selected currency
    const colors = ["#60A5FA", "#FF6384", "#9CD33B"];
    const datasets = await Promise.all(
      reduxSelectedCurrencies.map(async (currency, index) => {
        const color = colors[index % colors.length];
        try {
          const url = `https://api.coingecko.com/api/v3/coins/${currency.toLowerCase()}/market_chart?vs_currency=${reduxCurrency}&days=${days}&interval=daily&x_cg_demo_api_key=${apiKey}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch. Please try again later.");
          }
          const data = await response.json();

          // Formatting the data for the chart
          const formattedData = formatChartData(data.prices, timeFrame);
          formattedDataArray.push(formattedData.map((d) => d.date));

          return {
            label: currency,
            data: formattedData.map((d) => d.value),
            borderColor: color,
            backgroundColor: color,
          };
        } catch (error) {
          console.error(error);
        }
      })
    );

    // Common dates among all datasets
    let commonDates = formattedDataArray.reduce(
      (acc, dates) => acc.filter((date) => dates.includes(date)),
      formattedDataArray[0] || []
    );

    // Filtering datasets to have data only for common dates
    const filteredDatasets = datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.filter((i, index) =>
        commonDates.includes(
          formattedDataArray[datasets.indexOf(dataset)][index]
        )
      ),
    }));

    // Update chart data state
    if (datasets.length > 0) {
      setChartData({
        labels: commonDates,
        datasets: filteredDatasets,
      });
      setIsLoading(false);
    }
  };

  // Formats the chart data based on the selected time frame
  const formatChartData = (data, timeframe) => {
    // Format data based on time frame
    switch (timeFrame) {
      case "1D":
        return data.reduce((acc, d) => {
          const day = new Date(d[0]).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          });
          if (!acc.find((item) => item.date === day)) {
            acc.push({ date: day, value: d[1] });
          }
          return acc;
        }, []);
      case "1W":
        return data.reduce((acc, d) => {
          const date = new Date(d[0]);
          // Check if the day is Monday
          if (date.getDay() === 1) {
            // It returns 1 for Monday
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            acc.push({
              date: formattedDate,
              value: d[1],
            });
          }
          return acc;
        }, []);
      case "1M":
        return data.reduce((acc, d) => {
          const monthYear = new Date(d[0]).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
          if (!acc.find((item) => item.date === monthYear)) {
            acc.push({ date: monthYear, value: d[1] });
          }
          return acc;
        }, []);
      case "6M":
        return data.reduce((acc, d) => {
          const date = new Date(d[0]);
          const year = date.getFullYear();
          const formattedDate =
            date.getMonth() > 6 ? `July ${year}` : `Jan ${year}`;
          if (!acc.find((item) => item.date === formattedDate)) {
            acc.push({ date: formattedDate, value: d[1] });
          }
          return acc;
        }, []);
      case "1Y":
        return data.reduce((acc, d) => {
          const year = new Date(d[0]).toLocaleDateString("en-US", {
            year: "numeric",
          });
          if (!acc.find((item) => item.date === year)) {
            acc.push({ date: year, value: d[1] });
          }
          return acc;
        }, []);
      default:
        return data;
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [reduxCurrency, reduxSelectedCurrencies, timeFrame]);

  const timeFrames = ["1D", "1W", "1M", "6M", "1Y"];
  const chartList = ["Bar chart horizontal", "Line", "Bar chart vertical"];

  // Handlers for toggling dropdowns
  const toggleCurrencyDropdown = () => {
    if (showCurrency) {
      setSearchTerm("");
    }
    setShowCurrency(!showCurrency);
  };

  const handleCryptoCurrency = (currency, event) => {
    if (event.target.type === "checkbox") {
      const isChecked = event.target.checked;
      if (isChecked) {
        dispatcher({ type: "ADD_CRYPTO_CURRENCY", payload: currency });
      } else {
        dispatcher({ type: "REMOVE_CRYPTO_CURRENCY", payload: currency });
      }
    } else {
      if (reduxSelectedCurrencies.includes(currency)) {
        dispatcher({ type: "REMOVE_CRYPTO_CURRENCY", payload: currency });
      } else {
        dispatcher({ type: "ADD_CRYPTO_CURRENCY", payload: currency });
      }
    }
  };

  // Handler for changing the chart type
  const handleChart = (e) => {
    setChartType(e.target.textContent);
    setShowChart(false);
  };

  // Rendering the component
  return (
    <div className="h-96 md:h-3/5 bg-gray-100 rounded-lg shadow-lg relative flex flex-col">

      {/* Time frame buttons */}
      <div className="flex flex-wrap h-20 justify-around items-center">
        <div className="flex">
          {timeFrames.map((time) => (
            <button
              key={time}
              onClick={() => setTimeFrame(time)}
              className={`px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-base rounded-lg mx-1 ${
                timeFrame === time
                  ? "bg-blue-200 border border-blue-600"
                  : "bg-gray-200 border"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Currency dropdown  */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <button
              className="bg-gray-200 px-2 py-1 text-sm  lg:px-4 lg:py-2 lg:text-base rounded-lg w-full flex justify-between items-center gap-2"
              onClick={toggleCurrencyDropdown}
            >
              Cryptocurrency
              <IoTriangle style={{ transform: "rotate(180deg)" }} />
            </button>
            {showCurrency && (
              <ul className="absolute z-20 mt-2 rounded shadow-md bg-gray-300 p-2 max-h-32 overflow-x-hidden overflow-y-auto w-52 custom-scrollbar">
                <div className="flex justify-center p-2">
                  <input
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="Search..."
                  />
                </div>
                {cryptoCurrencyList
                  .filter((currency) =>
                    currency.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    const A = reduxSelectedCurrencies.includes(a);
                    const B = reduxSelectedCurrencies.includes(b);
                    if (A && !B) {
                      return -1; // a is selected and b is not, a should come before b
                    }
                    if (!A && B) {
                      return 1; // b is selected and a is not, b should come before a
                    }
                    return 0; // Both are selected or not selected, maintain original order
                  })
                  .map((currency) => (
                    <li
                      key={currency}
                      className="p-1 hover:bg-red-200 cursor-pointer"
                      onClick={(event) => handleCryptoCurrency(currency, event)}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={reduxSelectedCurrencies.includes(currency)}
                        onChange={(event) =>
                          handleCryptoCurrency(currency, event)
                        }
                      />
                      {currency}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Chart type dropdown */}
          <div className="relative">
            <button
              className="bg-gray-200 px-2 py-1 text-sm lg:px-4 lg:py-2 lg:text-base rounded-lg w-full flex justify-between items-center gap-2"
              onClick={() => setShowChart(!showChart)}
            >
              {chartType}
              <IoTriangle style={{ transform: "rotate(180deg)" }} />
            </button>
            {showChart && (
              <ul className="absolute z-10 mt-2 rounded shadow-md bg-gray-300 p-2 max-h-20 overflow-y-auto w-56 custom-scrollbar right-0 md:left-0">
                {chartList.map((chart) => (
                  <li
                    key={chart}
                    className="p-1 hover:bg-red-200 cursor-pointer"
                    onClick={handleChart}
                  >
                    {chart}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Chart display area */}
      <div className="flex-grow p-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {chartData &&
              chartData.datasets &&
              chartData.datasets.length > 0 && (
                <>
                  {chartType === "Line" && <LineChart ChartData={chartData} />}
                  {chartType === "Bar chart vertical" && (
                    <BarChartVertical ChartData={chartData} />
                  )}
                  {chartType === "Bar chart horizontal" && (
                    <BarChartHorizontal ChartData={chartData} />
                  )}
                </>
              )}
          </>
        )}
      </div>
    </div>
  );
}

export default GraphComponent;
