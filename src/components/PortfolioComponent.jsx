import React from "react";
import PieChart from "../charts/PieChart";

function PortfolioComponent() {
    const data = {
        labels: ["Ethereum","Tether","Luna"],
        datasets: [
            {
                label: "Holdings",
                data: [250,375,375],
                borderWidth: 0,
            }
        ]
    };

    // Total value of holdings
    const total = data.datasets[0].data.reduce((acc,val) => acc + val,0);

    return (
        <div className="bg-gray-100 rounded-lg shadow-lg py-4 px-8 flex flex-col">
            <div className="flex items-center justify-between gap-4">
            <h1 className="text-center text-xl font-semibold">Portfolio</h1>
            <h1 className="font-light">Total value: <span className="font-semibold">${total}</span></h1>
            </div>

            {/* Pie chart */}
            <div className="flex justify-center items-center mt-4">
                <PieChart ChartData={data} />
            </div>
        </div>
    )
}

export default PortfolioComponent;